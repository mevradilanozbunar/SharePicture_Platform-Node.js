import Photo from '../models/photoModel.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


const createPhoto = async (req,res) => {

    const result= await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename:true,
            folder:"Photo_Share_App",
            
        }
        );

try{
    await Photo.create({
        name:req.body.name,
        description:req.body.description,
        user:res.locals.user._id,
        url:result.secure_url,
        image_public_id:result.public_id,
    });
    fs.unlinkSync(req.files.image.tempFilePath);

    res.status(201).redirect("/users/dashboard");
}
catch(error) {
    res.status(500).json({
        succeded:false,error
    });
}
};

const getAllPhotos= async(req,res) => {
    try{
        const photos=res.locals.user 
        ? await Photo.find({ user: { $ne: res.locals.user._id } })
        : await Photo.find({});
        res.status(200).render("photos",{photos,link:"photos"});
       
    }
    catch(error) {
        res.status(500).json({
            succeded:false,error
        });
    }
};


const getAPhoto= async(req,res) => {
    try{
        const photo=await Photo.findById({_id:req.params.id}).populate("user");
        let isOwner =false;
        if(res.locals.user){
         isOwner= photo.user.equals(res.locals.user._id);
        }
        
        res.status(200).render("photo",{photo,isOwner,link:"photos"});

    }
    catch(error) {
        res.status(500).json({
            succeded:false,error
        });
    }
};

const deleteAPhoto= async(req,res) => {
    try{
        const photo=await Photo.findById({_id:req.params.id});
        const public_id = await photo.image_public_id;

        await cloudinary.uploader.destroy(public_id);
        await Photo.findByIdAndRemove({_id:req.params.id});
        
        res.status(200).redirect("/users/dashboard");
    }
    catch(error) {
        res.status(500).json({
            succeded:false,error
        });
    }
};


const updateAPhoto= async(req,res) => {
    try{
        const photo=await Photo.findById({_id:req.params.id});
        
        if(req.files)
        {
            const public_id =photo.image_public_id;
            await cloudinary.uploader.destroy(public_id);

            const result= await cloudinary.uploader.upload(
                req.files.image.tempFilePath,
                {
                    use_filename:true,
                    folder:"Photo_Share_App",
                    
                }
                );

                photo.url=result.secure_url;
                photo.image_public_id=result.public_id;
                fs.unlinkSync(req.files.image.tempFilePath);
                
        }
        photo.name=req.body.name;
        photo.description=req.body.description;

        photo.save();

        res.status(200).redirect(`/photos/${req.params.id}`);
    }
    catch(error) {
        res.status(500).json({
            succeded:false,error
        });
    }
};

export {updateAPhoto,createPhoto,getAllPhotos,getAPhoto,deleteAPhoto};