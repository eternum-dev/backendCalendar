const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//creamos el servidor de express
const app = express();


//directorio publico 
app.use(express.static('public'));

//base de datos 
dbConnection();


//cors 
app.use(cors());

//lectura y parseo del body
app.use(express.json());


//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


// escuchamos la peticion 
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo puerto ${process.env.PORT}`);
})


