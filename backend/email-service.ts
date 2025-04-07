import nodemailer from "nodemailer"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})


/**
 * Send an email using nodemailer
 * @param to Recipient email address
 * @param subject Email subject
 * @param text Plain text content
 * @param html HTML content
 * @returns Promise that resolves with the info object
 */
export async function sendEmail(to: string, subject: string, text: string, html: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent:", info.response)
    return info
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

/**
 * Send a contact form submission
 * @param name Sender's name
 * @param email Sender's email
 * @param subject Email subject
 * @param message Message content
 * @returns Promise that resolves with the info object
 */
export async function sendContactForm(name: string, email: string, subject: string, message: string) {
  const htmlContent = `
    <h1>New Contact Form Submission</h1>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <h2>Message:</h2>
    <p>${message.replace(/\n/g, "<br>")}</p>
  `

  return sendEmail(
    "avinash.yadav02102004@gmail.com",
    `Synexis Contact Form: ${subject}`,
    `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage: ${message}`,
    htmlContent,
  )
}

