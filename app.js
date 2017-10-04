const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')

//Conexion a la base de datos
mongoose.connect(config.database);

//Cuando se establece la conexion
mongoose.connection.on('connected', () => {
    console.log('Conectado a la base de datos: ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Error en la base de datos: ' + err);
});


const app = express();

const usuarios = require('./routes/usuarios');
const asientos = require('./routes/asientos');

//Puerto
const port = 3000;

//CORS Middleware
app.use(cors());

//Carpeta Publica
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/usuarios', usuarios);
app.use('/asientos', asientos);


//Ruta Principal
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Servidor Iniciado
app.listen(port, () =>{
    console.log('Servidor iniciado en el puerto: ' + port);
});
