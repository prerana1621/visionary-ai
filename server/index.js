const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Idea = require('./models/Idea');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.post('/api/ideas', async (req, res) => {
  try {
    const { title, description } = req.body;
    const model = genAI.getGenerativeModel({ 
        model: "gemini-flash-latest", 
        generationConfig: { responseMimeType: "application/json" } 
    });

    const prompt = `Expert startup analysis. Return ONLY JSON: problem, customer, market, competitor (3 strings), tech_stack (list), risk_level (Low/Medium/High), profitability_score (0-100), justification. Input: ${title} - ${description}`;

    const result = await model.generateContent(prompt);
    let report = JSON.parse(result.response.text());

    if (Array.isArray(report.competitor)) {
      report.competitor = report.competitor.map(item => 
        typeof item === 'object' ? `${Object.keys(item)[0]}: ${Object.values(item)[0]}` : String(item)
      );
    }

    const newIdea = new Idea({ title, description, report });
    await newIdea.save();
    res.status(201).json(newIdea);
  } catch (error) {
    res.status(500).json({ error: "Analysis failed" });
  }
});

app.get('/api/ideas', async (req, res) => res.json(await Idea.find().sort({ createdAt: -1 })));
app.get('/api/ideas/:id', async (req, res) => res.json(await Idea.findById(req.params.id)));
app.delete('/api/ideas/:id', async (req, res) => {
  await Idea.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));