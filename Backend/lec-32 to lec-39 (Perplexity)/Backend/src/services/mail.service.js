import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter (NO manual access token)
function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });
}

// Send email
export async function sendEmail({ to, subject, text, html }) {
  try {
    const transporter = getTransporter();

    const info = await transporter.sendMail({
      from: process.env.GOOGLE_USER,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
}