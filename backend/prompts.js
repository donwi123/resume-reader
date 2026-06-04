

const reviewPrompt = (resume, jobDescription) => `
    You are an expert recruiter...
    Resume: ${resume}
    Job: ${jobDescription}
    Respond only in JSON i need a match score ie how much the resume fits the job from 0 - 100
    Strengths the applicant has relating to the job description.
    Improvments that can be made to better fit the description
    and finally missing key words that appear on the job description but not the resume.
`

module.exports = { reviewPrompt }