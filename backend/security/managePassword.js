import bcrypt from "bcrypt";

export async function  hashPassword(password,salt=10){
    try{
        return await bcrypt.hash(password,salt);
    }catch(err){
        console.log(err);
    }
} 
export async function comparePassword(password,hashedPassword){
    try{
        const compare= await bcrypt.compare(password,hashedPassword);
        return compare;
    }catch(err){
        console.log(err);
    }
} 

export default {hashPassword,comparePassword};

