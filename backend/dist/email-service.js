"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactForm = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Create a transporter
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
/**
 * Send an email using nodemailer
 * @param to Recipient email address
 * @param subject Email subject
 * @param text Plain text content
 * @param html HTML content
 * @returns Promise that resolves with the info object
 */
async function sendEmail(to, subject, text, html) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return info;
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
exports.sendEmail = sendEmail;
/**
 * Send a contact form submission
 * @param name Sender's name
 * @param email Sender's email
 * @param subject Email subject
 * @param message Message content
 * @returns Promise that resolves with the info object
 */
async function sendContactForm(name, email, subject, message) {
    const htmlContent = `
    <h1>New Contact Form Submission</h1>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <h2>Message:</h2>
    <p>${message.replace(/\n/g, "<br>")}</p>
  `;
    return sendEmail("avinash.yadav02102004@gmail.com", `Synexis Contact Form: ${subject}`, `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage: ${message}`, htmlContent);
}
exports.sendContactForm = sendContactForm;
