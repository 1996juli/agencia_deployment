import express from "express";
import router from './routes/index.js';
import db from './config/db.js'

const app = express();

import dotenv from 'dotenv';
dotenv.config({ path: "./variables.env" });

//Conectar con la BD
db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error => console.log(error));

//Habilitar PUG
app.set('view engine','pug');

//Obtener el año actual
app.use((req, res, next) =>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia Viajes";
    next(); 
});

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar Router
app.use('/', router);

//**Puerto y host para la app */

const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, ()=>{
    console.log(`El servidor esta funcionando`);
}); 