import mongoose from "mongoose";
const schemaCreator = mongoose.Schema;
const objectID= schemaCreator.ObjectId;

const resumeSchema = new schemaCreator({
    user_id :{type:String ,required:true},
    resume_data:{type:Object,required:true}
});

export const resumeModel = mongoose.model("resumes",resumeSchema);

//  give all entry of resume with given user_id
export async function  getAllResume(user_id ){
    try{
        const userResumes= await resumeModel.find({user_id:user_id}); 
        return userResumes;
    }catch(err){
        return { error : err.name , success:false};
    }
}

// get a resume by resume_id but it ensure user_id is same for authorization that resume belongs to user 
export async function  getResumeById(user_id,resume_id ){
    try{
        const userResumes= await resumeModel.findOne({user_id:user_id,_id:resume_id}); 
        return userResumes;
    }catch(err){
        console.log("some thing went wrong in resume by id ")
        return null
    }
}

// this is work in progress not completed yet 
// export async function updateResume(resume_id, updatedSections) {
//     try{
//         const resume = await resumeModel.updateOne({_id:resume_id},{updatedSections});    
//         return resume;
//     }catch(err){
//         return { error : err.name , success:false};
//     }    
// }


