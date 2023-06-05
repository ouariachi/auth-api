import mongoose from "mongoose";
import LogManager from "../logs/index.js"


export function initDB(callback){
    const logManager = new LogManager();
    
    // eslint-disable-next-line no-undef
    mongoose.connect(process.env.DB_URL).catch(err => console.log(err));
    
    //CONNECTION LISTENERS
    const db = mongoose.connection;
    
    db.on("connected", () => {
        logManager.dataBase(`[initDB] {${new Date().getTime()}} Connected to DataBase.`);
        console.log(">> Conectado a base de datos.");
        
        if(callback) callback();
    });
    
    db.on("error", () => { 
        logManager.dataBase(`[initDB] {${new Date().getTime()}} Data base error.`);
        console.error(">> No se pudo conectar a la base de datos."); 
    });
}