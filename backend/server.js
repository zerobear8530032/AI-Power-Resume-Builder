//  main server file 
import express from "express";
import mongoose from "mongoose";
import dotenv, { populate } from "dotenv"
import { userModel, getUserByName, getUserByEmail } from "./model/userDataSchema.js";
import { comparePassword, hashPassword } from "./security/managePassword.js";
import { createJWT, verifyJWT } from "./security/jwt.js"
import { processJWTMiddleWare } from "./middleware/jwtMiddleware.js";

import resumeRouter from "./routes/resumeRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const URI = process.env.DB_URI;
const port = process.env.PORT;
const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
const app = express();

var corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(cookieParser());

const conn = mongoose.connect(URI);



app.use(express.json());
// Logging middlewarecle
// app.use((req, res, next) => {
//     // const authHeader = req.headers['authorization']; // case-insensitive
//     // const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
//     console.log("JWT from header:", token);
//     console.log("Full URL:", req.protocol + "://" + req.get("host") + req.originalUrl);
//     console.log("Path only:", req.path);
//     console.log("Method:", req.method);
//     console.log("Body:", req.body);
//     console.log("Query:", req.query);
//     console.log("Cookies:", req.cookies); // <- all cookies as an object
//     next();
// });


app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Username, email, and password are required"
            });
        }
        const lowerUserName = username.toLowerCase()
        const lowerEmail = email.toLowerCase()
        const userExist = await getUserByName(lowerUserName);
        if (userExist) {
            return res.status(400).json(
                {
                    "success": false,
                    "message": "Username already exists",
                    "fields": ["username"]
                }
            )
        }

        const emailExist = await getUserByEmail(lowerEmail);
        if (emailExist) {
            return res.status(400).json(
                {
                    "success": false,
                    "message": "Email already exists",
                    "fields": ["email"]
                }
            )
        }
        const hashedPassword = await hashPassword(password);
        const newEntry = {
            username: lowerUserName,
            email: lowerEmail,
            password: hashedPassword
        };
        const newUser = new userModel(newEntry);
        await newUser.save();
        return res.status(200).json(
            {
                "success": true,
                "message": "Register Successfull ",
            }
        )
    } catch (err) {
        res.status(500).send("some thing went wrong !");
    }
})

// set the user Refresh token in Cookied
function setToken(response, refreshToken, timeMilliSec) {
    response.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // true on production
        sameSite: "lax",
        maxAge: timeMilliSec  // 7 days
    });
}

// clear the user Refresh token in Cookied
function clearToken(response) {
    response.clearCookie("refreshToken");
    return { "success": true, "message": "user logout" };
}


// this is login where 2 jwt get created 
// 1 short lived access token
// one long lived refresh token

app.post("/login", async (req, res) => {
    try {
        // validate user inputs
        const { email, password } = req.body;
        console.log(req.body);
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "Email or Password is required",
                fields: ["email", "password"]
            });
        }

        const lowerEmail = email.toLowerCase();

        const user = await getUserByEmail(lowerEmail);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email or Password is incorrect",
                fields: ["email", "password"]
            });
        }
        // compare user password with hashed password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Email or Password is incorrect",
                fields: ["email", "password"]
            });
        }
        // creating access token
        const accessToken = createJWT({
            username: user.username,
            email: user.email,
            user_id: user._id,
        }, ACCESS_SECRET_KEY, "HS256", "15m");


        // creating refresh token
        const refreshToken = createJWT(
            {
                username: user.username,
                email: user.email,
                id: user._id,
            },
            REFRESH_SECRET_KEY,
            "HS256",
            "7d"
        );

        // set refresh token in user cookies
        setToken(res, refreshToken, 7 * 24 * 60 * 60 * 1000);
        return res.status(200).json(
            {
                "success": true,
                "username": user.username,
                "id": user._id,
                "email": user.email,
                "accessToken": accessToken
            }
        )
    } catch (err) {
        return res.status(500).send("some thing went wrong !");
    }
})

// logout : clear cookies which are set for refresh Token 
app.post("/logout", (req, res) => {
    const result = clearToken(res);
    return res.json(result);
})


// this is  test route to check user is login not for end user 

app.get("/", processJWTMiddleWare, (req, res) => {
    return res.status(200).json({ user: req.user, body: req.body });
})

// added the resume routes
app.use("/resume", processJWTMiddleWare, resumeRouter);



// start server
app.listen(port, () => {
    console.log(`server listening at Port ${port}`);
})

