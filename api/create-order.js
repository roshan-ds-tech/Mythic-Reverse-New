import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount, email, courseName } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `course_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Store order_id in the registration record using service role key
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

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

    const { error: updateErr } = await supabase
      .from("student_registrations")
      .update({ order_id: order.id })
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
