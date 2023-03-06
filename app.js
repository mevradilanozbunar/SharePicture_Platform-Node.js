import express from 'express';
import dotenv from 'dotenv';
import conn  from './config/dB.js';    
import Pagerouter from './routes/pageRoute.js';  
import Photorouter from './routes/photoRoute.js';
import Userrouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();
conn();
const app= express();

app.set("view engine","ejs");

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));//Bu ara yazılım, istek nesnesindeki "req.body" özelliğine form verilerini ekler ve uygulamanın sonraki ara yazılımı veya yönlendirme işlevleri tarafından kullanılabilir hale getirir. Bu sayede, gelen isteklerdeki form verileri kolayca kullanılabilir hale gelir.
app.use(cookieParser());

app.use("/",Pagerouter);
app.use("/photos",Photorouter);
app.use("/users",Userrouter);

app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
});