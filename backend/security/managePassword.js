import bcrypt from "bcrypt";

//  hashpassword by bycrypt
export async function  hashPassword(password,salt=10){
    try{
        return await bcrypt.hash(password,salt);
    }catch(err){
        console.log(err);
    }
} 
// compare the password with the original password with by crypt
export async function comparePassword(password,hashedPassword){
    try{
        const compare= await bcrypt.compare(password,hashedPassword);
        return compare;
    }catch(err){
        console.log(err);
    }
} 

export default {hashPassword,comparePassword};

