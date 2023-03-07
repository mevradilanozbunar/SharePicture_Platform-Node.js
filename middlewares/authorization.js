import JsonWebToken from 'jsonwebtoken';
import User from '../models/userModel.js';

const validateToken=async(req,res,next) => {
    try{
    const token= req.cookies.JsonWebToken;

    if(token) {
        JsonWebToken.verify(token,process.env.JWT_PRIVATE_KEY,(err)=>{
            if(err) {
             
                res.redirect("/login");
            }
            else {
                next();
            }
        });
    }
    else{
      
        res.redirect("/login");

    }
    }
    catch(error){
        console.log(error);
        res.status(401).json({succeed:false,error:"not authorized ",});
    }
    

};







export {validateToken};