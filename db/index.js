import mongoose from "mongoose";


export function initDB(callback){
    
    // eslint-disable-next-line no-undef
    mongoose.connect(process.env.DB_URL).catch(err => console.log(err));
    
    //CONNECTION LISTENERS
    const db = mongoose.connection;
    
    db.on("connected", () => {
        console.log(">> Conectado a base de datos.");
        
        if(callback) callback();
    });
    
    db.on("error", () => { 
        console.error(">> No se pudo conectar a la base de datos."); 
    });
}