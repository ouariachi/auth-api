import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";
import util from "util";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class LogManager {
    #DB_LOGS = null;
    #TOKEN_LOGS = null;
    #AUTH_LOGS = null;
    #ERROR_LOGS = null;

    constructor(){
        this.#DB_LOGS = fs.createWriteStream(__dirname + "/db.log", {flags: "a"});
        this.#TOKEN_LOGS = fs.createWriteStream(__dirname + "/token.log", {flags: "a"});
        this.#AUTH_LOGS = fs.createWriteStream(__dirname + "/auth.log", {flags: "a"});
        this.#ERROR_LOGS = fs.createWriteStream(__dirname + "/error.log", {flags: "a"});
    }

    dataBase(data){
        this.#DB_LOGS.write(util.format(data) + "\n");
    }
    
    token(data){
        this.#TOKEN_LOGS.write(util.format(data) + "\n");
    }
    
    auth(data){
        this.#AUTH_LOGS.write(util.format(data) + "\n");
    }

    error({id, context, err}){
        if(!id){
            id = "noid_" + Math.floor(Math.random() * 20);
        }
        const line = `[${context}] (${id}) ${err}`;
        this.#ERROR_LOGS.write(util.format(line) + "\n");
    }
}