import User from '../models/userModel.js';
import bcrypt from 'bcrypt'; 
import JsonWebToken from 'jsonwebtoken';
import Photo from '../models/photoModel.js';

const createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ user: user._id });
    } catch (error) {

      let errors2 = {};

      if (error.code === 11000) {
        errors2.email = 'The Email is already registered';
      } 

      if(error.name === "ValidationError") {
        Object.keys(error.errors).forEach((key) => {
          errors2[key]=error.errors[key].message;
        });
      }

      res.status(400).json(error);
    }
  };
  const loginUser = async (req, res) => {
    try {
     const{username,password} = req.body;
     const user =await User.findOne({username:username});
     let same=false;

     if(user){
      same=await bcrypt.compare(password,user.password);
     }
     else {
      return res.status(401).json({error:"there is no such user"});
     }
     if(same){
      const token=createToken(user._id);
      res.cookie("JsonWebToken",token,{httpOnly:true,maxAge:1000*60*60*24}); //1day
      //HTTP çerezi oluşturmak için kullanılır.res.cookie fonksiyonu, HTTP isteğine bir çerez eklemek için kullanılır. İlk argüman, çerezin adıdır. Bu örnekte, çerezin adı "jsonwebtoken" olarak belirlenmiştir.İkinci argüman, çerezin değeridir. Bu örnekte, token adlı bir değişkenin değeri çerez değeri olarak atanmıştır.Üçüncü argüman, çerezin özelliklerini belirler. httpOnly:true özelliği, çerezin JavaScript tarafından okunmasını engeller ve sadece HTTP istekleri tarafından gönderilir. Bu, güvenlik açısından önemlidir, çünkü bir saldırganın, sayfa üzerindeki JavaScript kodunu kullanarak çerezi çalmasını engeller.maxAge özelliği, çerezin ne kadar süre boyunca saklanacağını belirler. Bu örnekte, çerez 24 saat boyunca saklanacak şekilde ayarlanmıştır. maxAge özelliği, milisaniye cinsinden bir değer alır, bu nedenle bu örnekte 1000*60*60*24 ifadesi, 1 gün (24 saat) boyunca çerezin saklanacağını belirtir.
      res.status(200);
      res.redirect("/users/dashboard");

     }
     else{
      res.status(401).json({error:"password are not match"});
    
     }
    } catch (error) {
      res.status(500).json(error);
    }
  };
  const getDashboardPage = async (req,res) => {
    const photos = await Photo.find({ user: res.locals.user._id });
    res.render("dashboard",{link:"dashboard",photos}); };

  const createToken=(userId) => {
    return JsonWebToken.sign({userId},process.env.JWT_PRIVATE_KEY,{
      expiresIn:"1d",
    });
  };

  export {
    createUser,loginUser,getDashboardPage 
  };