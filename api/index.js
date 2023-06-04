/* eslint-disable no-undef */
import express from "express";
import { authRouter } from "./routers/auth.js";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // __filename is not defined in ES module scope
const __dirname = path.dirname(__filename); // __dirname is not defined in ES module scope

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/auth", authRouter);
app.use("/", express.static(path.join(__dirname, "docs")));


export function initAPI() {
    app.listen(process.env.PORT, () => {
        console.log(`>> La aplicación está escuchando en el puerto ${process.env.PORT}`);
    });
    return app;
}