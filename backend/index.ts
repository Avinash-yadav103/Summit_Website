import express from "express"
import cors from "cors"
import { sendContactForm } from "./email-service"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

// Create Express app
const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Send email
    await sendContactForm(name, email, subject, message)

    res.status(200).json({ success: true })
  } catch (error) {
    console.error("Error in contact form submission:", error)
    res.status(500).json({ error: "Failed to send email" })
  }
})

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

