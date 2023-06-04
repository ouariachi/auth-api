import { Schema, model } from "mongoose";
import { UserModel } from "./user.js";
import crypto from "crypto";

export const TokenSchema = new Schema({
    accessToken: {
        required: true,
        unique: true,
        type: String,
        index: true
    },
    refreshToken: {
        required: true,
        unique: true,
        type: String,
        index: true
    },
    username: {
        required: true,
        type: String,
        lowercase: true,
        trim: true,
        match: /^[a-zA-Z0-9._]+$/g,
    },
    remoteAddress: {
        required: true,
        type: String,
        trim: true
    },
    scopes: [String],
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    expirationDate: {
        type: Date,
        default: () => {
            const date = new Date();
            date.setDate(date.getDate() + 1);
            return date;
        },
        expires: 1 
    }
});

TokenSchema.methods.checkAccess = function (username) {
    return this.username === username;
}

TokenSchema.methods.getUser = async function () {
    const user = await UserModel.findOne({ username: this.username });
    return user;
}

TokenSchema.methods.refresh = function () {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    
    this.accessToken = this.refreshToken;
    this.expirationDate = date;
    this.setRefresh();
}

TokenSchema.methods.setToken = function () {
    this.accessToken = crypto.randomBytes(64).toString("base64");
}

TokenSchema.methods.setRefresh = function () {
    this.refreshToken = crypto.randomBytes(64).toString("base64");
}

TokenSchema.methods.setTokens = function () {
    this.setToken();
    this.setRefresh();
}

export const TokenModel = model("token", TokenSchema, "Tokens");