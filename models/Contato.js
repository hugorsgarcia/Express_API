const mongoose = require('mongoose');

// Define o schema para a coleção 'Contatos'
const ContatoSchema = new mongoose.Schema(
    {
        
        nome: { type: String, required: [true, "O campo 'nome' é obrigatório."] },
        
        email: { type: String, required: [true, "O campo 'email' é obrigatório."] },
        
        telefone: { type: String, required: [true, "O campo 'telefone' é obrigatório."] }
    },
    {
        timestamps: true
    }
)

// Exporta o model 'Contatos' para ser utilizado nas rotas.
module.exports = mongoose.model('Contatos', ContatoSchema);