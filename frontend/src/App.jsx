import { useState } from 'react'

import './App.css'

function App() {

  return (
    <html>
      <body>
        <h1>Resume Reveiw With Gemeni!</h1>
        <p>Please write in a Resume and job desc</p>

        <form>
          <label for="jobDesc"> Please Enter Job Description:</label>
          <input type="text" id="jobDesc" name="jobDesc"></input>
          <label for="resume"> Please Enter Resume:</label>
          <input type="text" id="resume" name="resume"></input>


        </form>
      </body>
    </html>
      
  )
}

export default App
