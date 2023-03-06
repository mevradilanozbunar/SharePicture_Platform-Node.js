import JsonWebToken from 'jsonwebtoken';
import User from '../models/userModel.js';

const validateToken=async(req,res,next) => {
    try{
    const autHeader= req.headers.Authorization || req.headers.authorization;
    const token= autHeader && autHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({succeed:false,error:"no token available",});
    }
    else{
        req.user=await User.findById(JsonWebToken.verify(token,process.env.JWT_PRIVATE_KEY).userId);
        next();

    }
    }
    catch(error){
        res.status(401).json({succeed:false,error:"not authorized ",});
    }
    

};







export {validateToken};