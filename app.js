import express from 'express';
import dotenv from 'dotenv';

const port=5000;

dotenv.config();
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

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});