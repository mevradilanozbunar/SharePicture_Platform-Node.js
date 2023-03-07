import express from 'express';
import dotenv from 'dotenv';
import conn  from './config/dB.js';    
import Pagerouter from './routes/pageRoute.js';  
import Photorouter from './routes/photoRoute.js';
import Userrouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import checkUser from './middlewares/checkUser.js';

dotenv.config();
conn();
const app= express();

app.set("view engine","ejs");

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));//Bu ara yazılım, istek nesnesindeki "req.body" özelliğine form verilerini ekler ve uygulamanın sonraki ara yazılımı veya yönlendirme işlevleri tarafından kullanılabilir hale getirir. Bu sayede, gelen isteklerdeki form verileri kolayca kullanılabilir hale gelir.
app.use(cookieParser());

app.use("*",checkUser); //tüm get methodlarınde checkuserı check etmeli
app.use("/",Pagerouter);
app.use("/photos",Photorouter);
app.use("/users",Userrouter);

app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
});

//app.use("*", checkUser) kodu, Express.js uygulamasında tüm HTTP isteklerini yakalamak ve checkUser isimli bir middleware fonksiyonu kullanarak her istek öncesi kimlik doğrulama yapmak için kullanılır.Yani, app.use("*", checkUser) kodu, tüm HTTP isteklerini karşılar ve checkUser isimli middleware fonksiyonunu her istek öncesi çağırarak kimlik doğrulama işlemini gerçekleştirir. Bu sayede, tüm route handler'larının öncesinde kimlik doğrulama işleminin gerçekleştirilmesi sağlanır.