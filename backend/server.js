require('dotenv').config()

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;



app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json ({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.post('/api/review', async (req, res) => {
    const resume = req.body.resume
    const jobDescription = req.body.jobDescription
    
    if(!resume){
        return res.status(400).json({ error: 'Resume is required'})
    }

    if(!jobDescription){
        return res.status(400).json({ error: 'Job Description is required'})
    }

    try{
        // call gemeni

    } catch(err) {
        console.error(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})