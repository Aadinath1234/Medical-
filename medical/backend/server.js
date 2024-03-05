const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://0.0.0.0:27017/admin',{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> console.log('mongodb connected ')).catch(err=> console.log(err));





const patientSchema = new mongoose.Schema({
    name:String, 
    age:Number,
    symptoms:[String]
});



const Patient = mongoose.model('Patient',patientSchema );




app.post('/submit', async(req, res)=>{
  try{
    const {name,age, symptoms} = req.body;
    const newPatient = new Patient({name,age,symptoms });
    await newPatient.save();





  let disease = 'unknown';
  let treatment = 'no treatment suggested '  


 res.status(200).json({message:'Patient details saved successfully ', disease, treatment });

  } catch(error){
    res.status(500).json({error: error.message});
  }




});

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=> console.log(`server runnig on port ${PORT}`));