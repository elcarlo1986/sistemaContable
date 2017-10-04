const mongoose = require('mongoose');
const config = require('../config/database');


//Esquema del concepto
const ConceptoSchema = mongoose.Schema({
    concepto:{
        type: String
    },
    monto: {
        type: Number
    }
});

//Esquema del asiento
const AsientoSchema = mongoose.Schema({
    fecha: {
        type: String,
        required: true
    },
    debe: {
        type: [ConceptoSchema],
        required: true        
    },
    haber: {
        type: [ConceptoSchema],
        required: true        
    }
});

const Asiento = module.exports = mongoose.model('Asiento', AsientoSchema);

module.exports.getAsientos = function(callback){
    Asiento.find((err, asientos)=>{
        if(err) return callback(err, null)
        callback(null, asientos)
    });
}


module.exports.getFiltrarAsientos = function(query, callback){
    Asiento.find(query, (err, asientos)=>{
        if(err) return callback(err, null)
        callback(null, asientos)
    });
}

module.exports.addAsiento = function(nuevoAsiento, callback){
    nuevoAsiento.save(callback);
}