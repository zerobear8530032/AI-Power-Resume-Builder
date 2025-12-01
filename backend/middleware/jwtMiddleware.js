import express from "express";
import { verifyJWT,createJWT } from "../security/jwt.js";
import dotenv from "dotenv";
dotenv.config();  // <-- this must be before using process.env

const ACCESS_SECRET_KEY= process.env.ACCESS_SECRET_KEY;
const REFRESH_SECRET_KEY= process.env.REFRESH_SECRET_KEY;

export  const verifyRefreshToken= ((req,res,next)=>{
    const {refreshToken } = req.cookies;
    if(!refreshToken){
        // this error means we will redirect to login
        return res.status(401).json({
            status:false,
            message:"Cannot Found Refresh Token Please Relogin",
            error: "No Refresh token provided",
            reason : "REFRESH TOKEN" 
        });
    }        
    const validateRefresh= verifyJWT(refreshToken,REFRESH_SECRET_KEY,['HS256']);
    // this error means we will redirect to login
    if(!validateRefresh.valid){
        return res.status(401).json({
            status:false,
            message: "Invalid or expired Refresh token Please Relogin",
            error: validateRefresh?.error || "Token validation failed",
            reason : "REFRESH TOKEN"
        });
    }
    // remove the valid refresh from the token for storing only valid data 
    delete validateRefresh.valid;
    const newAccessToken = createJWT(validateRefresh,ACCESS_SECRET_KEY,'HS256',"15m");
    res.setHeader("x-access-token", newAccessToken);
    req.user = { ...validateRefresh, accessToken: newAccessToken };
    next();
});
export const  verifyAccessToken= ((req,res,next)=>{    
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader?.split(" ")[1];
    if(!accessToken){
        return verifyRefreshToken(req,res,next);
    }    
    const validateAccess=verifyJWT(accessToken,ACCESS_SECRET_KEY,["HS256"]);
    
    if(!validateAccess.valid){
        return verifyRefreshToken(req,res,next);
    }

    req.user=validateAccess;
    next();
});
