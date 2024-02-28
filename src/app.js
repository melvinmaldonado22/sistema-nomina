const express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
const path = require('path');
require('./modules/database');
require('dotenv').config();
const empleadoRouter = require('./routes/empleado')
let port = process.env.PORT || 3000;
let host = process.env.HOST || '0.0.0.0';
const app = express();

app.use(cors()); // para permitir peticiones de otros origenes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})) // para entender json desde las url

// midellwares

app.use(express.static(path.join(__dirname, 'public')));
app.use('/empleados', empleadoRouter);

// Iniciar server
app.listen (port,host, ()=>{ 
    
    console.log(`Servidor iniciado!! -  En el puerto: ${port}`);
})