import mongoose, { mongo } from "mongoose";
const schemaCreator = mongoose.Schema;
const objectID= schemaCreator.ObjectId;

const userSchema = new schemaCreator({
    username :{type:String ,require:true,unique:[true,"UserName Already Exists"]},
    email :{type:String ,require:true,unique:[true,"Email Already Exists"]},
    password:{type:String ,require:true},
});


export  const userModel= mongoose.model("users",userSchema);

export async function getUserByName(username){
   const user = await userModel.findOne({username:username})
   return user;
}
export async function getUserByEmail(email){
    const user=await userModel.findOne({email:email})
    return user;
}
export async function getUserForLogin(email){
    const user=await userModel.findOne({email:email})
    return user;
}