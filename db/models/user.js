import { Schema, model } from "mongoose";
import crypto from "node:crypto";

export const UserSchema = new Schema({
    username: {
        unique: true,
        required: true, 
        lowercase: true,
        trim: true,
        maxLength: 20,
        match: /^[a-zA-Z0-9._]+$/g,
        type: String
    },
    name: {
        firstname: String,
        lastname: String
    },
    email: String,
    date: {
        required: true,
        type: Date,
        default: Date.now
    },
    lastConnection: {
        type: Date
    },
    remoteAddress: {
        required: true,
        type: String, 
        trim: true
    },
    roles: {
        type: [String],
        default: ["user"]
    },
    passwordHash: String,
    salt: String
});

UserSchema.methods.getHash = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
}

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = this.getHash(password);
}

UserSchema.methods.verifyPassword = function(password) {
    return this.passwordHash === this.getHash(password);
}

export const UserModel = model("User", UserSchema ,"Users");