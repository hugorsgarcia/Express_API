const express = require("express")
const router = express.Router()
const Contatos = require('../models/Contato');
const { default: mongoose } = require("mongoose");


// Listar contatos
router.get('/', async (req, res) => {
    const dados = await Contatos.find();

    const retorno = {
        "alert": dados.length == 0 ? 'warning' : 'success',
        "message": "Dados listados com sucesso.",
        "data": dados
    }

    res.json(retorno)
})

// Criar contato
router.post('/', async (req, res) => {
    const dados = await Contatos.create(req.body);
    res.status(200).json(dados)
})

//Buscar por ID
router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ "error": "Id enviado não é válido" })
        }
        const dado = await Contatos.findById(req.params.id);
        if (!dado) {
            return res.status(404).json({ error: "erro, não achamos o id" })
        }
        res.status(200).json(dado)
    }
    catch (err) {
        res.status(404).json({ "error": err.message })
    }
})

//Atualizar por ID
router.put('/:id', async (req, res) => {
    try {
        const dado = await Contatos.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!dado) {
            return res.status(404).json({ error: 'Contato não encontrado' })
        }
        res.json(dado)
    }
    catch (err) {
        res.status(404).json({ "error": err.message })
    }
})

//deletar por ID
router.delete('/:id', async (req, res) => {
    try {
        const dado = await Contatos.findByIdAndDelete(req.params.id)
        if (!dado) {
            return res.status(404).json({ error: 'Contato não encontrado' })
        }
        res.json({ message: 'Contato deletado com sucesso!' })
    }
    catch (err) {
        res.status(404).json({ "error": err.message })
    }
})

module.exports = router