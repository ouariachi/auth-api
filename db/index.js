import mongoose from "mongoose";
import LogManager from "../logs/index.js"

const logManager = new LogManager();
const db = mongoose.connection;

//CONNECTION LISTENERS
db.on("connected", () => {
    logManager.dataBase(`[initDB] {${new Date().getTime()}} Connected to DataBase.`);
    console.log(">> Conectado a base de datos.");
});
db.on("error", () => { 
    logManager.dataBase(`[initDB] {${new Date().getTime()}} Data base error.`);
    console.error(">> No se pudo conectar a la base de datos."); 
});

export function initDB(){
    // eslint-disable-next-line no-undef
    mongoose.connect(process.env.DB_URL).catch(err => console.log(err));
}