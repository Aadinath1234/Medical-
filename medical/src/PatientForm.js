import React, {useState} from 'react';
import axios from 'axios';


const PatientForm = () =>{
    const[name, setName] = useState('');
    const [age, setAge] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [message, setMessage] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
         const response = await axios.post('http://localhost:3001/submit', {
            name, 
            age,
            symptoms:symptoms.split(',').map(symptom => symptom.trim())
         });
         setMessage(response.data.message);
        }catch(error){
            setMessage('Error submitting patient details');
            console.error(error);
        }
    };


    return(
      <div>
         <h1>Patient form </h1>

         <form onSubmit={handleSubmit}>
         <label htmlFor="name">Name: </label>

         <input type="text" id='name' value={name} onChange={(e)=> setName(e.target.value)} required  /> <br /><br />


         <label htmlFor="age">Age:</label>
         <input type="number" id='age' value={age} onChange={(e)=> setAge(e.target.value)} required /> <br /><br />


         <label htmlFor="symptoms">Symptoms(comma-separated): </label>
         <input type="text" id='symptoms' value={symptoms} onChange={(e)=> setSymptoms(e.target.value)} required /> <br /><br />




         <button
         type='submit ' onClick={handleSubmit}
         >submit </button>





         </form>

         {message && <p>{message}</p>}
      </div>
    );
};

export default PatientForm;
