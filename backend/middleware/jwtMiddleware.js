import express from "express";
import { verifyJWT,createJWT } from "../security/jwt.js";
import dotenv from "dotenv";
dotenv.config();  // <-- this must be before using process.env

const ACCESS_SECRET_KEY= process.env.ACCESS_SECRET_KEY;
const REFRESH_SECRET_KEY= process.env.REFRESH_SECRET_KEY;

export  const manageRefreshToken= ((req,res,next)=>{
    const {refreshToken } = req.cookies;
    console.log(`refreshToken ${refreshToken}`);
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
    const newAccessToken = createJWT(validateRefresh,ACCESS_SECRET_KEY,'HS256',"15m");
    res.setHeader("x-access-token", newAccessToken);
    req.user = { ...validateRefresh, accessToken: newAccessToken };
    next();
});
export const  manageAccessToken= ((req,res,next)=>{
    
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader?.split(" ")[1];
    if(!accessToken){
        return manageRefreshToken(req,res,next);
    }    
    const validateAccess=verifyJWT(accessToken,ACCESS_SECRET_KEY,["HS256"]);
    // here the token exists and works;
    if(!validateAccess.valid){
        return manageRefreshToken(req,res,next);
    }
    req.user=validateAccess;
    next();
});
