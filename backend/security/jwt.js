import jwt  from "jsonwebtoken";


export function createJWT(data,key,algorithm,time){
    const token = jwt.sign(data,key,{algorithm:algorithm,expiresIn:time});
    return token;
}

export function verifyJWT(token,key,algorithms){
    let tokendata=null;
    try{
        tokendata=jwt.verify(token,key,{algorithms:algorithms});
    }catch(err){
       return {valid:false, error:err.name}
    }

    // remove unwanted token data 
    delete tokendata.iat;
    delete tokendata.exp;
    return {...tokendata, valid:true};
}

export default {verifyJWT,createJWT};