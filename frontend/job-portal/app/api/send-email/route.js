// app/api/send-email/route.js
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request) {
  try {
    const formData = await request.formData();
    const from = formData.get("from");
    const to = formData.get("to");
    const subject = formData.get("subject");
    const text = formData.get("text");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: from,
      to: "lesueur774@gmail.com",
      subject: subject,
      text: text,
    });

    return NextResponse.json({
      message: "Email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error: error.message },
      { status: 500 }
    );
  }
}
