
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Contact = require("./models/contact");

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Contact form
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
            });
        }

        await Contact.create({ name, email, message });

        res.json({
            success: true,
            message: "Your message has been sent successfully!"
        });

    } catch (error) {
        console.error("Contact form error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to send your message. Please try again."
        });
    }
});

// Connect MongoDB and start server
async function startServer() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from your .env file");
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Portfolio server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Startup error:", error.message);
    }
}

startServer();
