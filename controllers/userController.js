import User from '../models/userModel.js';
import bcrypt from 'bcrypt'; 
import JsonWebToken from 'jsonwebtoken';

const createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({user});
    } catch (error) {
      res.status(500).json(error);
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
      res.status(200).json({
        user,
        token:createToken(user._id),
      });

     }
     else{
      res.status(401).json({error:"password are not match"});
    
     }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const createToken=(userId) => {
    return JsonWebToken.sign({userId},process.env.JWT_PRIVATE_KEY,{
      expiresIn:"1d",
    });
  };

  export {
    createUser,loginUser
  };