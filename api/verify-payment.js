import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      studentName,
      courseName,
    } = req.body;

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Invalid signature detected:", { expectedSignature, razorpay_signature });
      return res.status(400).json({ success: false, error: "Invalid signature" });
    }

    // Signature valid — update database using service role key
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Find the registration by order_id and email
    const { data: registration, error: findError } = await supabase
      .from("student_registrations")
      .select("id, selected_language")
      .eq("email", email)
      .eq("order_id", razorpay_order_id)
      .eq("payment_status", "pending")
      .single();

    if (findError || !registration) {
      console.error("Could not find registration:", findError);
      return res.status(400).json({ success: false, error: "Registration not found" });
    }

    const registrationId = registration.id;

    const { error: updateError } = await supabase
      .from("student_registrations")
      .update({
        payment_status: "paid",
        payment_id: razorpay_payment_id,
      })
      .eq("id", registrationId);

    if (updateError) {
      console.error("DB update error:", updateError);
      return res.status(500).json({ success: false, error: "Database update failed" });
    }

    // Send confirmation email
    try {
      const protocol = req.headers["x-forwarded-proto"] || (req.headers.host.includes("localhost") ? "http" : "https");
      const emailRes = await fetch(
        `${protocol}://${req.headers.host}/api/send-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            email, 
            studentName, 
            courseName, 
            registrationId,
            selectedLanguage: registration.selected_language
          }),
        }
      );
      if (!emailRes.ok) {
        console.error("Email sending failed:", await emailRes.text());
      }
    } catch (emailErr) {
      console.error("Email call error:", emailErr);
      // Don't fail the payment verification if email fails
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ success: false, error: "Verification failed" });
  }
}
