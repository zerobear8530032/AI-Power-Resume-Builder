import mongoose, { mongo } from "mongoose";
const schemaCreator = mongoose.Schema;
const objectID= schemaCreator.ObjectId;

const userSchema = new schemaCreator({
    id : {type:objectID},
    username :{type:String ,require:true,unique:[true,"UserName Already Exists"]},
    email :{type:String ,require:true,unique:[true,"Email Already Exists"]},
    password:{type:String ,require:true},
});


export  const registerSchema= mongoose.model("users",userSchema);

export async function getUserByName(username){
   const user = await registerSchema.findOne({username:username})
   return user;
}
export async function getUserByEmail(email){
    const user=await registerSchema.findOne({email:email})
    return user;
}
export async function getUserForLogin(email){
    const user=await registerSchema.findOne({email:email})
    return user;
}