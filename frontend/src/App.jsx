import { useState } from 'react';
import './App.css';    

export default function App() {
  const [jobDesc, setJobDesc] = useState('');
  const [resume, setResume] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [buttonText, setButtonText] = useState('Analyse Resume + Job Desc');
  const [error, setError] = useState(null)
  const API_URL = import.meta.env.VITE_API_URL + '/api/review'

  async function handleSubmit(e){
    setButtonText('loading')
    setError(null)
    try{
    const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resume, jobDescription: jobDesc })
    })

    const data = await response.json()

    setFeedback(data)
    setButtonText('Analyse Resume + Job Desc') 
  }catch (error) {
    setError('Something went wrong. Please try again.')
    setButtonText('Analyse Resume + Job Desc')  
  }
  }

  
    return (
    <div className='app-container'>

    <div className="header">
      <h1>Resume Reviewer</h1>
      <p>Paste your resume and a job description to get AI feedback</p>
    </div>

    <div className="form-area">
      <label>
        Enter Job Description:
        <textarea className='textarea' name="inputJobDesc" 
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        />
      </label>
    
      <label>
        Enter Resume :
        <textarea className='textarea' name="inputResume" 
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        />
      </label>
    </div>

    <div className='submit-button'>
    <button onClick={handleSubmit}>{buttonText}</button>
    </div>

    <div className='paragraph'>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>

    {feedback && (
    <div className='main-div'>
        <div className='score'>
          <h1 style={{ color: feedback.matchScore >= 75 ? 'green' : feedback.matchScore >= 50 ? 'orange' : 'red' }}>{feedback.matchScore}/100</h1>
          <span className={feedback.matchScore >= 75 ? 'badge-strong' : feedback.matchScore >= 50 ? 'badge-moderate' : 'badge-weak'}> 
            {feedback.matchScore >= 75 ? 'Strong Match' : feedback.matchScore >= 50 ? 'Moderate Match' : 'Weak Match'}
          </span>
        </div>

        <div className='paragraph'>
        <p>{feedback.summary}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          
          <div className='strengths-div'> 
            <h2>Strengths</h2>
              <ul>
                  {feedback.strengths.map((item, index) => (
                      <li key={index}>{item}</li>
                  ))}
              </ul>
          </div>

          <div className='improvments-div'>         
            <h2>Improvements</h2>
              <ul>
                {feedback.improvements.map((item,index) => (
                    <li key={index}>{item}</li>
                ))}
              </ul>
          </div> 

          <div className='keywords-div'> 
            <h2>Missing Keywords</h2>
              <ul>
                {feedback.missingKeywords.map((item,index) => (
                    <li key={index}>{item}</li>
                ))}
              </ul>
          </div> 
      </div>

    </div>
    
    
)}
     </div> 
      
  

  
  
  )
}
