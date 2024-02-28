var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombre: String,
    cargo: String,
    dias_trabajados: String,
    salario: String
});

module.exports = mongoose.model('empleados',esquema)