import express, { Router } from "express";
import {resumeModel,getAllResume,getResumeById} from "../model/resumeSchema.js";

//  this router handle entire resume routes
export const resumeRouter = Router();

// this is for create Resume 
// which create a resume and send a default template
resumeRouter.post("/",(req,res)=>{
    res.json({...req.user,message:"create resume"});
});

// this is for get All Resume by user_Id
resumeRouter.get("/",async (req,res)=>{
    try{
        const userData= req.user;
        console.log(userData);
        const user_id= userData?.user_id;
        const resumes = await getAllResume(user_id);
        const newAccessToken= req.user?.accessToken;
        return res.json({...resumes,accessToken:newAccessToken});
    }catch(err){
        console.log(err);
    }
});

// this get one resume with given id resume_id
// but it also make sure the resume is created by user
resumeRouter.get("/:id",async(req,res)=>{
    const resume_id = req.params?.id;
    const userData= req.user;
    console.log(userData);
    const user_id= userData?.user_id;
    const resume = await getResumeById(user_id,resume_id);
    const newAccessToken= req.user?.accessToken;
    if(!resume){
        return res.status(404).json({
            success:false,
            message:"Access denied"
        })
    }
    return res.json({...resume.toObject(),success:true, accessToken:newAccessToken});
});


//  this is the routes handle resume updates 
resumeRouter.patch("/",async(req,res)=>{
    return res.send("patch")    
})

export default resumeRouter;