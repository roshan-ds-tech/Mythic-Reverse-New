import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

const COURSE_PRICES = {
  "App Development with React Native": 19499,
  "Programming Languages": 8499,
  "Full Stack Web Development": 21999,
  "App Development with Flutter": 19499,
  "Ethical Hacking & Cybersecurity": 14999
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount, email, courseName, couponCode } = req.body;

    const originalPrice = COURSE_PRICES[courseName];
    if (!originalPrice) {
      return res.status(400).json({ error: "Invalid course name." });
    }

    let finalAmount = originalPrice;

    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // If coupon is provided, we MUST recalculate and validate securely
    if (couponCode) {
      const { data: coupon, error: couponErr } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", couponCode.toUpperCase())
        .single();

      if (coupon && !couponErr) {
        let isValid = true;
        
        if (!coupon.is_active) isValid = false;
        if (coupon.expiry_date && new Date(coupon.expiry_date) < new Date()) isValid = false;
        if (coupon.usage_limit !== null && coupon.used_count >= coupon.usage_limit) isValid = false;
        if (coupon.applicable_course_ids && coupon.applicable_course_ids.length > 0 && !coupon.applicable_course_ids.includes(courseName)) isValid = false;

        if (isValid) {
          let discountAmount = 0;
          if (coupon.discount_type === "percentage") {
            discountAmount = Math.floor((originalPrice * coupon.discount_value) / 100);
          } else if (coupon.discount_type === "fixed") {
            discountAmount = coupon.discount_value;
          }
          finalAmount = originalPrice - discountAmount;
          if (finalAmount < 0) finalAmount = 0;
        }
      }
    }

    const options = {
      amount: finalAmount * 100, // Convert to paise
      currency: "INR",
      receipt: `course_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const { data: records, error: fetchErr } = await supabase
      .from("student_registrations")
      .select("id")
      .eq("email", email)
      .eq("course_name", courseName)
      .eq("payment_status", "pending")
      .order("created_at", { ascending: false })
      .limit(1);

    if (fetchErr || !records || records.length === 0) {
      console.error("Could not find pending registration:", fetchErr || "No records");
      return res.status(400).json({ error: "No pending registration found" });
    }

    // Save the applied coupon code to the registration for incrementing later
    const updateData = { order_id: order.id };
    if (couponCode) {
      updateData.applied_coupon = couponCode.toUpperCase();
    }

    const { error: updateErr } = await supabase
      .from("student_registrations")
      .update(updateData)
      .eq("id", records[0].id);

    if (updateErr) {
      console.error("Failed to update order_id:", updateErr);
      return res.status(500).json({ error: "Failed to bind order to registration" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
}
