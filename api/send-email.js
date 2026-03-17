import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, studentName, courseName, registrationId, selectedLanguage } = req.body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const languageText = selectedLanguage 
      ? ` focusing on <strong style="color: #D946EF;">${selectedLanguage}</strong>` 
      : "";

    await resend.emails.send({
      from: "prasanna@mythicreverse.com",
      to: email,
      subject: "Welcome to the Program! Your Enrollment is Confirmed 🚀",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Enrollment Confirmed</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #050505; -webkit-font-smoothing: antialiased;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050505; width: 100%; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0A0A0A; border-radius: 24px; overflow: hidden; border: 1px solid #1A1A1A; box-shadow: 0 25px 50px -12px rgba(139, 92, 246, 0.1);">
                  
                  <!-- Header Area -->
                  <tr>
                    <td style="padding: 40px; text-align: center; background: linear-gradient(180deg, rgba(139, 92, 246, 0.15) 0%, rgba(10, 10, 10, 0) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                      <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; background: linear-gradient(to right, #ffffff, #A1A1AA); -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: #ffffff;">
                        MythicReverse
                      </h1>
                    </td>
                  </tr>

                  <!-- Hero Banner -->
                  <tr>
                    <td style="padding: 40px 40px 20px 40px; text-align: center;">
                      <div style="display: inline-block; background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(217, 70, 239, 0.2)); padding: 12px 24px; border-radius: 100px; border: 1px solid rgba(139, 92, 246, 0.3); margin-bottom: 24px;">
                        <p style="margin: 0; font-size: 14px; font-weight: 600; color: #D946EF; letter-spacing: 0.5px; text-transform: uppercase;">
                          Payment Successful
                        </p>
                      </div>
                      <h2 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                        You're in, ${studentName.split(' ')[0]}!
                      </h2>
                      <p style="margin: 0; font-size: 16px; color: #A1A1AA; line-height: 1.6; font-weight: 400;">
                        Your seat is officially secured. We are thrilled to welcome you to the community.
                      </p>
                    </td>
                  </tr>

                  <!-- Course Details Box -->
                  <tr>
                    <td style="padding: 20px 40px;">
                      <div style="background-color: #111111; border: 1px solid #222222; border-radius: 16px; padding: 24px;">
                        <p style="margin: 0 0 8px 0; font-size: 13px; color: #71717A; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                          Enrolled Program
                        </p>
                        <p style="margin: 0; font-size: 18px; color: #E4E4E7; font-weight: 500; line-height: 1.5;">
                          <strong style="color: #8B5CF6;">${courseName}</strong>${languageText}
                        </p>
                      </div>
                    </td>
                  </tr>

                  <!-- Next Steps Section -->
                  <tr>
                    <td style="padding: 20px 40px 40px 40px;">
                      <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #ffffff;">
                        What happens next?
                      </h3>
                      <p style="margin: 0 0 24px 0; font-size: 15px; color: #A1A1AA; line-height: 1.6;">
                        Our core team is currently reviewing your registration. We will reach out to you very soon with your complete onboarding package, including your class schedule and access to all premium learning resources.
                      </p>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <div style="border-left: 3px solid #8B5CF6; padding-left: 16px;">
                              <p style="margin: 0; font-size: 14px; font-style: italic; color: #71717A;">
                                "Every expert was once a beginner. Your journey starts now."
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 32px 40px; text-align: center; border-top: 1px solid #1A1A1A; background-color: #070707;">
                      <p style="margin: 0 0 12px 0; font-size: 13px; color: #52525B;">
                        Need help? Reply directly to this email.
                      </p>
                      <p style="margin: 0; font-size: 12px; color: #3F3F46; font-weight: 500;">
                        © ${new Date().getFullYear()} MythicReverse. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    // Update email_sent flag in database
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    await supabase
      .from("student_registrations")
      .update({ email_sent: true })
      .eq("id", registrationId);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ success: false, error: "Email sending failed" });
  }
}
