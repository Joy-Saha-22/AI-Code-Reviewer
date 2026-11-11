const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();  

if (!process.env.GOOGLE_GEMINI_KEY) {
    throw new Error("Missing GOOGLE_GEMINI_KEY in environment variables!");
}

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-3.8-flash",
    systemInstruction: `
        You are a Senior Code Reviewer (7+ years experience).
        Your job is to analyze, review, and improve code.
        - Ensure best practices, performance, security, and scalability.
        - Highlight issues and suggest improvements with examples.
        - Be direct, precise, and use simple explanations.
    `
});

// Function to generate content
async function generateContent(prompt) {
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;

        const review = response.text();

        console.log("AI Response:", review);

        return review;

    } catch (error) {
        console.error("AI Service Error:", error.message);
        throw error;
    }
}

module.exports = generateContent;
