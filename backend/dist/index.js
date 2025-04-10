"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const email_service_1 = require("./email-service");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        // Validate input
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        // Send email
        await (0, email_service_1.sendContactForm)(name, email, subject, message);
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Error in contact form submission:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});
// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
