import { useState } from 'react';

export default function App() {
  const [jobDesc, setJobDesc] = useState('');
  const [resume, setResume] = useState('');
  const [feedback, setFeedback] = useState(null);
  const API_URL = 'http://localhost:3001/api/review'

  async function handleSubmit(e){

    const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resume, jobDescription: jobDesc })
    })

    const data = await response.json()
    setFeedback(data.feedback)
  }

  
    return (
      <>


    <label>
       Enter Job Description:
      <textarea name="inputJobDesc" 
       value={jobDesc}
       onChange={(e) => setJobDesc(e.target.value)}
      />
    </label>

    <label>
       Enter Resume :
      <textarea name="inputResume" 
       value={resume}
       onChange={(e) => setResume(e.target.value)}
      />
    </label>

    <button onClick={handleSubmit}>Analyse Resume + Job Desc</button>
    {feedback && <p>{feedback}</p>}
      
      </>
  

  
  
  )
}
