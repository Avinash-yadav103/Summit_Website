import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate the input
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create HTML content for the email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
        <h1 style="color: #be185d; margin-bottom: 20px; text-align: center;">New Contact Form Submission</h1>
        <div style="background-color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <p style="margin: 8px 0;"><strong style="color: #7e22ce;">Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong style="color: #7e22ce;">Email:</strong> ${email}</p>
          <p style="margin: 8px 0;"><strong style="color: #7e22ce;">Subject:</strong> ${subject}</p>
        </div>
        <div style="background-color: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <h2 style="color: #be185d; font-size: 18px; margin-bottom: 10px;">Message:</h2>
          <p style="line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
        </div>
        <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">This email was sent from the Synexis Event Website contact form.</p>
      </div>
    `

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Configure mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ieeewie@bennett.edu.in",
      subject: `Synexis Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage: ${message}`,
      html: htmlContent,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

