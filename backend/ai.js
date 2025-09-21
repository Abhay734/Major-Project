// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node  

import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

const generateEmailPrompt = (scenario) => `
Generate a professional HTML email template for the following scenario:
Scenario: ${scenario}

Requirements:
- Include a subject line.
- Use a friendly greeting.
- Write a clear and concise message body relevant to the scenario.
- End with a polite closing.
- Format the email using HTML with inline CSS for styling.
- Ensure the template is responsive and visually appealing.

Output format:
Subject: <subject>
HTML:
<html>
  <!-- HTML email content here -->
</html>
`;

const generateAdvancedEmailPrompt = (purpose, subject, tone) => `
Generate a professional HTML email template with the following details:
Purpose: ${purpose}
Subject: ${subject}
Tone: ${tone}

Requirements:
- Use the provided subject line.
- Use a friendly greeting.
- Write a clear and concise message body relevant to the purpose.
- Apply the specified tone throughout the email.
- End with a polite closing.
- Format the email using HTML with inline CSS for styling.
- Ensure the template is responsive and visually appealing.

Output format:
Subject: <subject>
HTML:
<html>
  <!-- HTML email content here -->
</html>
`;

async function generateEmail(scenario) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const tools = [
    { googleSearch: {} },
  ];
  const config = {
    thinkingConfig: { thinkingBudget: -1 },
    tools,
  };
  const model = 'gemini-2.5-pro';
  const prompt = generateEmailPrompt(scenario);
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];
  try {
    let result = '';
    const response = await ai.models.generateContentStream({ model, config, contents });
    for await (const chunk of response) {
      result += chunk.text;
    }
    return result;
  } catch (error) {
    if (error && error.status === 503) {
      return `Subject: Welcome to Our Service\nBody:\nDear User,\n\nWe are excited to welcome you to our platform. If you have any questions, feel free to reach out.\n\nBest regards,\nThe Team`;
    } else {
      throw error;
    }
  }
}

async function generateAdvancedEmail(purpose, subject, tone) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const tools = [
    { googleSearch: {} },
  ];
  const config = {
    thinkingConfig: { thinkingBudget: -1 },
    tools,
  };
  const model = 'gemini-2.5-pro';
  const prompt = generateAdvancedEmailPrompt(purpose, subject, tone);
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];
  try {
    let result = '';
    const response = await ai.models.generateContentStream({ model, config, contents });
    for await (const chunk of response) {
      result += chunk.text;
    }
    return result;
  } catch (error) {
    if (error && error.status === 503) {
      return `Subject: ${subject}\nBody:\nDear User,\n\n${purpose}\n\nBest regards,\nThe Team`;
    } else {
      throw error;
    }
  }
}

// POST /email/generate { scenario: "..." }
router.post('/generate', async (req, res) => {
  const { scenario } = req.body;
  if (!scenario) {
    return res.status(400).json({ message: 'Scenario is required' });
  }
  try {
    const emailText = await generateEmail(scenario);
    res.status(200).json({ email: emailText });
  } catch (err) {
    res.status(500).json({ message: 'AI generation failed', error: err.message });
  }
});

// POST /email/advanced-generate { purpose: "...", subject: "...", tone: "..." }
router.post('/advanced-generate', async (req, res) => {
  const { purpose, subject, tone } = req.body;
  if (!purpose || !subject || !tone) {
    return res.status(400).json({ message: 'Purpose, subject, and tone are required' });
  }
  try {
    const emailText = await generateAdvancedEmail(purpose, subject, tone);
    res.status(200).json({ email: emailText });
  } catch (err) {
    res.status(500).json({ message: 'AI generation failed', error: err.message });
  }
});

export default router;
