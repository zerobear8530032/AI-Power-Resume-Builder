import express, { Router } from "express";
import {resumeModel,getAllResume,getResumeById} from "../model/resumeSchema.js";
export const resumeRouter = Router();


resumeRouter.post("/",(req,res)=>{
    res.json({...req.user,message:"create resume"});
});

resumeRouter.get("/",async (req,res)=>{
    try{
        const userData= req.user;
        const user_id= userData?.id;
        const resumes = await getAllResume(user_id);
        const newAccessToken= req.user?.accessToken;
        return res.json({...resumes,accessToken:newAccessToken});
    }catch(err){
        console.log(err);
    }
});
resumeRouter.get("/:id",async(req,res)=>{
    const resume_id = req.params?.id;
    const userData= req.user;
    const user_id= userData?.id;
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

export default resumeRouter;