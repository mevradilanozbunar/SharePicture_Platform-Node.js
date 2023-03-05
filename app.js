import express from 'express';
import dotenv from 'dotenv';
import conn  from './config/dB.js';    


dotenv.config();
conn();
const app= express();

app.set("view engine","ejs");

app.use(express.static('public'));
app.use(express.json());

app.get('/',(req,res)=>{
    res.render("index");
});
app.get('/about',(req,res)=>{
    res.render("about");
});

app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
});