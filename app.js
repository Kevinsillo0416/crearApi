import express from 'express';
import http from "http";
import path from "path";
import bodyParser from 'body-parser';
import ejs from "ejs";
import {fileURLToPath} from 'url';
import misRutas from "./router/index.js";

// constantes 

const ___filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(___filename);


// generar el objeto principal

const app = express();


// conciguraciones

app.set('view engine', 'ejs');


// directorios
app.use(misRutas);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());




//iniciar el servidor

const puerto = 8080;
app.listen(puerto,()=>{
    
    console.log("Iniciando el servidor")

})