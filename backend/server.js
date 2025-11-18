import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import { registerSchema, getUserByName, getUserByEmail } from "./model/userDataSchema.js";
import { comparePassword, hashPassword } from "./security/managePassword.js";
import { createJWT, verifyJWT } from "./security/jwt.js"
import { manageAccessToken,manageRefreshToken } from "./middleware/jwtMiddleware.js";
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
        const newUser = new registerSchema(newEntry);
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

function setToken(response,refreshToken,timeMilliSec){
    response.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // true on production
        sameSite: "lax",
        maxAge: timeMilliSec  // 7 days
    });
}


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
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

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Email or Password is incorrect",
                fields: ["email", "password"]
            });
        }

        const accessToken = createJWT({
            username: user.username,
            email: user.email
        }, ACCESS_SECRET_KEY, "HS256", "15m");


        const refreshToken = createJWT(
            {
                username: user.username,
                email: user.email
            },
            REFRESH_SECRET_KEY,
            "HS256",
            "7d"
        );
//         console.log(`refresh token ${refreshToken}`);
//         console.log(`access token ${accessToken}`);
// //  refresh token expire in 7 days :
        setToken(res,refreshToken,7 * 24 * 60 * 60 * 1000);
        return res.status(200).json(
            {
                "success": true,
                "username": user.username,
                "email": user.email,
                "accessToken": accessToken
            }
        )
    } catch (err) {
        return res.status(500).send("some thing went wrong !");
    }
})


app.get("/",manageAccessToken, (req, res) => {
    return res.status(200).json({user:req.user,body:req.body});
})

app.listen(port, () => {
    console.log(`server listening at Port ${port}`);
})

