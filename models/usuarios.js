const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Esquema del usuario
const UsuarioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true        
    },
    username: {
        type: String,
        required: true        
    },
    password: {
        type: String,
        required: true        
    }
});

const Usuario = module.exports = mongoose.model('Usuario', UsuarioSchema);

module.exports.getUserById = function(id, callback){
    Usuario.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    Usuario.findOne(query, callback);
}

module.exports.addUser = function(nuevoUsuario, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(nuevoUsuario.password, salt, (err, hash) => {
            if(err) throw err;
            nuevoUsuario.password = hash;
            nuevoUsuario.save(callback);
        })
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}