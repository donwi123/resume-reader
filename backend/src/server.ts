import dotenv from 'dotenv'
dotenv.config()
import { Request, Response } from 'express'
import express from 'express'
import cors from 'cors'

import { GoogleGenAI } from '@google/genai'
import { reviewPrompt } from './prompts'

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })
const app = express();
const port = process.env.PORT;



app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.json ({ status: 'ok' });
});

app.post('/api/review', async (req: Request, res: Response) => {
    const resume = req.body.resume
    const jobDescription = req.body.jobDescription
    
    if(!resume){
        return res.status(400).json({ error: 'Resume is required'})
    }

    if(!jobDescription){
        return res.status(400).json({ error: 'Job Description is required'})
    }

    try{
        const prompt = reviewPrompt(resume, jobDescription)
        const result = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        })

        const resultText = result.text
        if(!resultText){
            return res.status(500).json({error: 'No response from AI'})
        }
        //Stops Gemeni trying to wrap JSON in markdown 
        const clean = resultText.replace(/```json|```/g, '').trim()
        const parsed = JSON.parse(clean)
        return res.json(parsed)



    } catch(err) {
        console.error(err)
        return res.status(500).json({error: 'Something went wrong'})
    }


})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})