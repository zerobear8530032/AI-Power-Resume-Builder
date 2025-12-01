import mongoose from "mongoose";
const schemaCreator = mongoose.Schema;
const objectID= schemaCreator.ObjectId;

const resumeSchema = new schemaCreator({
    user_id :{type:String ,required:true},
    resume_data:{type:Object,required:true}
});

export const resumeModel = mongoose.model("resumes",resumeSchema);


export async function  getAllResume(user_id ){
    try{
        const userResumes= await resumeModel.find({user_id:user_id}); 
        return userResumes;
    }catch(err){
        return { error : err.name , success:false};
    }
}

export async function  getResumeById(user_id,resume_id ){
    try{
        const userResumes= await resumeModel.findOne({user_id:user_id,_id:resume_id}); 
        return userResumes;
    }catch(err){
        console.log("some thing went wrong in resume by id ")
        return null
    }
}

export async function updateResume(resume_id, updatedSections) {
    try{
        const resume = await resumeModel.updateOne({_id:resume_id},{updatedSections});    
        return resume;
    }catch(err){
        return { error : err.name , success:false};
    }    
}


