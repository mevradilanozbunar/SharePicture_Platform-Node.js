import express from 'express';
import dotenv from 'dotenv';

const port=5000;
dotenv.config();
const app= express();

app.get('/',(req,res)=>{
    res.send("sayfa");
});
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});