
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Contact = require("./models/Contact");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

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

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.error("MongoDB connection error:", error.message));

app.listen(PORT, () => {
    console.log(`Portfolio server running at http://localhost:${PORT}`);
});


