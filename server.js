const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const cors = require('cors');  // Add this line to import the CORS package

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());  // Add this line to enable CORS globally

// Parse JSON request body
app.use(express.json());

// Initialize Google Generative AI client
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// POST route for chat
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        { role: "user", parts: [{ text: userMessage }] },
        { role: "model", parts: [{ text: "Hello. How can I assist you today?" }] },
      ],
    });
  
    const result = await chatSession.sendMessage(userMessage);
    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error('Error while chatting with AI:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Serve the frontend (optional, if you want to directly serve it from the backend)
app.use(express.static('frontend'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
