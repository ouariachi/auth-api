import express from "express";
import { UserModel } from "../../db/models/user.js";
import { TokenModel } from "../../db/models/token.js";


export const authRouter = express.Router();

authRouter.get("/", (req, res) => {
    res.json({ version: "1.0.0" });
});

authRouter.post("/login", async (req, res) => {
    if(!req.body.grant_type || req.body.grant_type !== "password") {
        res.status(400).json({ success: false, message: 'Invalid grant_type' });
        return;
    }

    if(!req.body || !req.body.username || !req.body.password) {
        res.status(400).json({
            success: false,
            message: "You must provide a username and password"
        });

        return;
    }

    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    
    if(!user) {
        res.status(404).json({
            success: false,
            message: "User not found"
        });

        return;
    }
    if(!user.verifyPassword(password)) {
        res.status(401).json({
            success: false,
            message: "Incorrect credentials"
        });

        return;
    }

    const token = new TokenModel({
        username: user.username,
        remoteAddress: req.ip,
        scopes: ["user"]
    });
    token.setTokens();
    
    if(!await token.save()) {
        res.status(500).json({
            success: false,
            message: "Failed to login due to server error"
        });
        return;
    }

    res.status(200).json({
        success: true,
        tokens: {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            expiration: token.expirationDate
        },
        user: {
            username: user.username,
            name: user.name,
            date: user.date,
            email: user.email,
            lastConnection: user.lastConnection,
            roles: user.roles
        }
    });
});

authRouter.post("/register", async (req, res) => {
    if(!req.body.grant_type || req.body.grant_type !== "client_credentials") {
        res.status(400).json({ success: false, message: 'Invalid grant_type' });
        return;
    }

    if(!req.body || !req.body.username || !req.body.password) {
        res.status(400).json({
            success: false,
            message: "You must provide a username and password"
        });
        return;
    }

    const savedUser = await UserModel.findOne({ username: req.body.username });
    if(savedUser) {
        res.status(409).json({
            success: false,
            message: "The username is already in use"
        });

        return;
    }

    const userData = {
        username: req.body.username,
        remoteAddress: req.ip        
    };

    if(req.body.firstname && req.body.lastname) {
        userData.name = {
            firstname: req.body.firstname,
            lastname: req.body.lastname
        };
    }

    if(req.body.email) {
        userData.email = req.body.email;
    }

    const user = new UserModel(userData);
    user.setPassword(req.body.password);

    if(!await user.save()) {
        res.status(500).json({
            success: false,
            message: "Failed to register"
        });
        return;
    }


    res.status(200).json({
        success: true
    });
});

authRouter.post("/refresh", async (req, res) => {
    if(!req.body.grant_type || req.body.grant_type !== "refresh_token") {
        res.status(400).json({ success: false, message: 'Invalid grant_type' });
        return;
    }

    const token = await TokenModel.findOne({ refreshToken: req.body.refreshToken });
    if(!token) {
        res.status(404).json({
            success: false,
            message: "Token not found or expired"
        });
        return;
    }

    token.refresh();

    if(!await token.save()) {
        res.status(500).json({
            success: false,
            message: "Failed to refresh due to server error"
        });
        return;
    }

    res.status(200).json({
        success: true,
        token: {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            expiration: token.expirationDate
        }
    });
});