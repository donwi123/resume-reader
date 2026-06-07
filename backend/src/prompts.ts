

export const reviewPrompt = (resume: string, jobDescription: string) => `
You are an expert recruiter. Analyse the resume against the job description.

Respond ONLY with a JSON object in this exact format, no other text:
{
  "matchScore": <number 0-100>,
  "summary": "<one sentence>",
  "strengths": ["<item>", "<item>"],
  "improvements": ["<item>", "<item>"],
  "missingKeywords": ["<item>", "<item>"]
}

Resume: ${resume}
Job Description: ${jobDescription}
`