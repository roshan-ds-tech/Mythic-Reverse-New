import { createClient } from "@supabase/supabase-js";

// Course Price Mapping to ensure backend determines original price securely
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
    const { couponCode, courseName } = req.body;

    if (!couponCode || !courseName) {
      return res.status(400).json({ error: "Coupon code and course name are required." });
    }

    const originalPrice = COURSE_PRICES[courseName];
    if (!originalPrice) {
      return res.status(400).json({ error: "Invalid course name." });
    }

    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Fetch coupon
    const { data: coupon, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", couponCode.toUpperCase())
      .single();

    if (error || !coupon) {
      return res.status(404).json({ error: "Invalid coupon code." });
    }

    // Validations
    if (!coupon.is_active) {
      return res.status(400).json({ error: "This coupon is no longer active." });
    }

    if (coupon.expiry_date && new Date(coupon.expiry_date) < new Date()) {
      return res.status(400).json({ error: "This coupon has expired." });
    }

    if (coupon.usage_limit !== null && coupon.used_count >= coupon.usage_limit) {
      return res.status(400).json({ error: "This coupon has reached its usage limit." });
    }

    if (coupon.applicable_course_ids && coupon.applicable_course_ids.length > 0) {
      if (!coupon.applicable_course_ids.includes(courseName)) {
        return res.status(400).json({ error: "This coupon is not applicable for this course." });
      }
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.discount_type === "percentage") {
      discountAmount = Math.floor((originalPrice * coupon.discount_value) / 100);
    } else if (coupon.discount_type === "fixed") {
      discountAmount = coupon.discount_value;
    }

    let finalPrice = originalPrice - discountAmount;
    if (finalPrice < 0) finalPrice = 0;

    return res.status(200).json({
      valid: true,
      originalPrice,
      discountAmount,
      finalPrice,
      message: `Coupon applied successfully!`
    });

  } catch (error) {
    console.error("Coupon validation failed:", error);
    res.status(500).json({ error: "Failed to validate coupon" });
  }
}
