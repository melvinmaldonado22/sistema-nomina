const express = require('express');
const router = express.Router();
const empleado = require('../models/empleado');
require('dotenv').config();

// :::::::::::::::::::::::::::::::::::::::::::
// ::               API REST                ::
// :::::::::::::::::::::::::::::::::::::::::::

// OBTENER todos los empleados

router.get('/', function(req,res){
    empleado.find().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});
let emp = {};
router.post('/guardar-empleado', function(req, res) {
    emp = new empleado({
        nombre: req.body.nombre,
        cargo: req.body.cargo,
        dias_trabajados: req.body.dias_trabajados,
        salario: req.body.salario
    });
    emp.save().then(result => {
        res.status(200).send({
            message: 'Empleado registrado con éxito',
            data: result
        });
    }).catch(error => {
        console.error('Error al guardar el empleado:', error);
        res.status(500).send({
            message: 'Ocurrió un error al registrar el empleado',
            error: error.message
        });
    });
});


module.exports = router;