const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Usuario = require('../models/usuarios');
const config = require('../config/database');

module.exports = function(passport){
    let options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    options.secretOrKey = config.secret;
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        Usuario.getUserById(jwt_payload.data._id, (err, user) => {
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        });
    }));
}