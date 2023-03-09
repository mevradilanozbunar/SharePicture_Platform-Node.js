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
    const user= await User.findById({_id : res.locals.user._id}).populate(["followers","followings"]);
    res.render("dashboard",{link:"dashboard",photos,user}); };

    const getAllUsers= async(req,res) => {
      try{
          const users=await User.find({ _id: { $ne: res.locals.user._id } });
          res.status(200).render("users",{users,link:"users"});
      }
      catch(error) {
          res.status(500).json({
              succeded:false,error
          });
      }
  };
  
  
  const getAUser= async(req,res) => {
      try{
          const user=await User.findById({_id:req.params.id});
          const photos=await Photo.find({user: user._id });
          res.status(200).render("user",{user,photos,link:"users"});
      }
      catch(error) {
          res.status(500).json({
              succeded:false,error
          });
      }
  };

  const follow= async(req,res) => {
    try{
       let user= await User.findByIdAndUpdate(
        {_id:req.params.id},
        {
          $push:{followers:res.locals.User._id}
        },
        {
          new:true
        },);

        user=await User.findByIdAndUpdate({_id:res.locals.User._id},
          {
            $push:{ followings: req.params.id }
          },
          {
            new:true
          },);
          res.status(200).json({succeded:true,user});
    }
    catch(error) {
        res.status(500).json({
            succeded:false,error
        });
    } };

    const unfollow= async(req,res) => {
      try{
         let user= await User.findByIdAndUpdate(
          {_id:req.params.id},
          {
            $pull:{followers:res.locals.User._id}
          },
          {
            new:true
          },);
  
          user=await User.findByIdAndUpdate({_id:res.locals.User._id},
            {
              $pull:{ followings: req.params.id }
            },
            {
              new:true
            },);
            res.status(200).json({succeded:true,user});
      }
      catch(error) {
          res.status(500).json({
              succeded:false,error
          });
      } };




  const createToken=(userId) => {
    return JsonWebToken.sign({userId},process.env.JWT_PRIVATE_KEY,{
      expiresIn:"1d",
    });
  };

  export {
    unfollow,follow,createUser,loginUser,getDashboardPage,getAllUsers,getAUser
  };