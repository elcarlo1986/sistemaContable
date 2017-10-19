const express = require('express');
const router = express.Router();
const Asiento = require('../models/asientos');




// Guardar asiento
router.post('/agregar', (req, res, next) =>{


    let nuevoAsiento = new Asiento({
        fecha: req.body.fecha,
        debe: req.body.debe,
        haber: req.body.haber,
    });

    Asiento.addAsiento(nuevoAsiento, (err, asiento) => {
        if(err){
            res.json({success: false, msg: 'Fallo la carga del asiento'});
        }else{
            res.json({success: true, msg: 'Asiento guardado'});
        }
    })
});

// Asientos guardados
router.get('/guardados', (req, res, next) => {
    Asiento.getAsientos((err, asientos) => {
        if(err) return res.json(err);
        res.json(asientos);
    });
});

// Filtrar asientos
//Por cuenta
router.get('/filtrar/cuenta', (req, res, next) => {
    let query = {$or: [ {'debe.concepto': req.query.concepto}, {'haber.concepto':req.query.concepto} ]};
    Asiento.getFiltrarAsientos(query, (err, asientos) => {
        if(err) return res.json(err);
        res.json(asientos);
    });
});

//Por fecha
router.get('/filtrar/fecha', (req, res, next) => {
    let query = {$and: [ {'fecha': {$gte: req.query.fechaInicio}}, {'fecha': {$lte: req.query.fechaFin}}]};
    Asiento.getFiltrarAsientos(query, (err, asientos) => {
        if(err) return res.json(err);
        res.json(asientos);
    });
});




module.exports = router;