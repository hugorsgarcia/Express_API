const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema(
    {
        nome: {type: String, required: true},
        email: {type: String, required: true},
        telefone: {type: String, required: true} 
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Contatos', ContatoSchema)