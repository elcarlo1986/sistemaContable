const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');




// Registro
router.post('/registrar', (req, res, next) =>{
    let nuevoUsuario = new Usuario({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    Usuario.addUser(nuevoUsuario, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Fallo el registro de usuario'});
        }else{
            res.json({success: true, msg: 'Usuario registrado'});
        }
    })
});

// Autenticacion
router.post('/autenticar', (req, res, next) =>{
    const username = req.body.username;
    const password = req.body.password;

    Usuario.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'Usuario inexistente'});
        }

        Usuario.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 604800 //1 Semana
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            }else{
                return res.json({success: false, msg: 'Contraseña incorrecta'});
            }
        })
    });
});

// Perfil
router.get('/perfil', passport.authenticate('jwt', {session: false}), (req, res, next) =>{
    res.json({user: req.user});
});


module.exports = router;