const express = require("express")
const router = express.Router()
const Contatos = require('../models/Contato');
const { default: mongoose } = require("mongoose");
const sendResponse = require('../utils/responseHandler'); // exportado como SendResponse


// Listar contatos
router.get('/', async (req, res) => {
    try {
        const dados = await Contatos.find();

        if (dados.length === 0) {
            // Se não houver contatos, retorna um alerta de 'warning'.
            sendResponse(res, 200, 'warning', 'Nenhum contato encontrado.', null);
        } else {
            // Retorna a lista de contatos com sucesso.
            sendResponse(res, 200, 'success', 'Dados listados com sucesso.', dados);
        }
    } catch (err) {
        sendResponse(res, 500, 'fail', 'Ocorreu um erro no servidor.', err.message);
    }
})

// Criar contato
router.post('/', async (req, res) => {
    try {
        // Tenta criar um novo contato com os dados do corpo da requisição.
        const dados = await Contatos.create(req.body);
        sendResponse(res, 201, 'success', 'Contato criado com sucesso.', dados);
    } catch (err) {
        // Se o erro for de validação do Mongoose (campos obrigatórios faltando).
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            sendResponse(res, 400, 'fail', 'Erro de validação. Verifique os dados enviados.', errors);
        } else {
            // Para outros tipos de erro, retorna um erro 500.
            sendResponse(res, 500, 'fail', 'Ocorreu um erro ao criar o contato.', err.message);
        }
    }
})

//Buscar por ID
router.get('/:id', async (req, res) => {
    try {
        // Verifica se o ID fornecido é um ObjectId válido.
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return sendResponse(res, 400, 'fail', 'O ID fornecido não é válido.', null);
        }

        const dado = await Contatos.findById(req.params.id);

        if (!dado) {
            // Se o contato não for encontrado, retorna 404.
            return sendResponse(res, 404, 'warning', 'Contato não encontrado.', null);
        }

        sendResponse(res, 200, 'success', 'Contato encontrado com sucesso.', dado);
    } catch (err) {
        sendResponse(res, 500, 'fail', 'Ocorreu um erro no servidor.', err.message);
    }
})

//Atualizar por ID
router.put('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return sendResponse(res, 400, 'fail', 'O ID fornecido não é válido.', null);
        }
        
        // Busca e atualiza o contato. {new: true} retorna o documento atualizado.
        // runValidators: true garante que as validações do schema sejam aplicadas na atualização.
        const dado = await Contatos.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        if (!dado) {
            return sendResponse(res, 404, 'warning', 'Contato não encontrado para atualização.', null);
        }

        sendResponse(res, 200, 'success', 'Contato atualizado com sucesso.', dado);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            sendResponse(res, 400, 'fail', 'Erro de validação ao atualizar.', errors);
        } else {
            sendResponse(res, 500, 'fail', 'Ocorreu um erro ao atualizar o contato.', err.message);
        }
    }
})

//deletar por ID
router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return sendResponse(res, 400, 'fail', 'O ID fornecido não é válido.', null);
        }

        const dado = await Contatos.findByIdAndDelete(req.params.id);

        if (!dado) {
            return sendResponse(res, 404, 'warning', 'Contato não encontrado para exclusão.', null);
        }

        sendResponse(res, 200, 'success', 'Contato deletado com sucesso!');
    } catch (err) {
        sendResponse(res, 500, 'fail', 'Ocorreu um erro ao deletar o contato.', err.message);
    }
})

module.exports = router