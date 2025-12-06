import mongoose, { mongo } from "mongoose";
const schemaCreator = mongoose.Schema;
const objectID= schemaCreator.ObjectId;
// this the user register collection 
const userSchema = new schemaCreator({
    username :{type:String ,require:true,unique:[true,"UserName Already Exists"]},
    email :{type:String ,require:true,unique:[true,"Email Already Exists"]},
    password:{type:String ,require:true},
});


export  const userModel= mongoose.model("users",userSchema);

// find the user entry by given username return null if not found
export async function getUserByName(username){
   const user = await userModel.findOne({username:username})
   return user;
}

// get user entry by email
export async function getUserByEmail(email){
    const user=await userModel.findOne({email:email})
    return user;
}
