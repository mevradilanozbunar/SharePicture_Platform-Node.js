import express from 'express';
import dotenv from 'dotenv';
import conn  from './config/dB.js';    
import Pagerouter from './routes/pageRoute.js';  

dotenv.config();
conn();
const app= express();

app.set("view engine","ejs");

app.use(express.static('public'));
app.use(express.json());

app.use("/",Pagerouter);


app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
});