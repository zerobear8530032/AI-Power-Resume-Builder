import jwt  from "jsonwebtoken";


export function createJWT(data,key,algorithm,time){
    const token = jwt.sign(data,key,{algorithm:algorithm,expiresIn:time});
    return token;
}

export function verifyJWT(token,key,algorithms){
    // console.log(`token : ${token},/n key : ${key}, algo : /n${algorithms}`);
    let tokendata=null;
    try{
        tokendata=jwt.verify(token,key,{algorithms:algorithms});
    }catch(err){
        console.log("not valid ")
       return {valid:false, error:err.name}
    }
    return {...tokendata, valid:true};
}

