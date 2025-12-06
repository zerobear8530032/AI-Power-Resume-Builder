// this handle entire middle ware of jwt verifiction and validation
import express from "express";
import { verifyJWT, createJWT } from "../security/jwt.js";
import dotenv from "dotenv";
dotenv.config();  // <-- this must be before using process.env

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

//  this verify refresh token its a 2 step process 
// where it get refresh token from cookies if found verify it 
// other wise send custom error response
export const verifyRefreshToken = ((req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        // this error means we will redirect to login
        return res.status(401).json({
            status: false,
            message: "Cannot Found Refresh Token Please Relogin",
            error: "No Refresh token provided",
            reason: "REFRESH TOKEN"
        });
    }
    const validateRefresh = verifyJWT(refreshToken, REFRESH_SECRET_KEY, ['HS256']);
    // this error means we will redirect to login
    if (!validateRefresh.valid) {
        return res.status(401).json({
            status: false,
            message: "Invalid or expired Refresh token Please Relogin",
            error: validateRefresh?.error || "Token validation failed",
            reason: "REFRESH TOKEN"
        });
    }
    // remove the valid refresh from the token for storing only valid data 
    delete validateRefresh.valid;
    const newAccessToken = createJWT(validateRefresh, ACCESS_SECRET_KEY, 'HS256', "15m");
    res.setHeader("x-access-token", newAccessToken);
    req.user = { ...validateRefresh, accessToken: newAccessToken };
    next();
});


// this is accessToken verification 
// extracting form header and verifying it 
// and return the data 

export const verifyAccessToken = ((req, res) => {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader?.split(" ")[1];
    if (!accessToken) {
        return {
            message: "access Token Not Found !",
            valid: false
        };
    }
    const validateAccess = verifyJWT(accessToken, ACCESS_SECRET_KEY, ["HS256"]);
    return validateAccess;
});


//  this verifyRefresh Token if that resolve success fully it append it to req body
// but if failed we verify the refresh token

export const processJWTMiddleWare = ((req, res, next) => {
    const validateAccess = verifyAccessToken(req, res, next);
    if (!validateAccess.valid) {
        return verifyRefreshToken(req, res, next);
    }

    req.user = validateAccess;
    next();
})

export default { processJWTMiddleWare };