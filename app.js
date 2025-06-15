// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const contatoRoutes = require("./routes/contatoRoutes") // Importa as rotas relacionadas a contatos.

// Inicializa a aplicação Express
const app = express()
//interpreta o corpo das requisições como JSON
app.use(express.json())

// Conecta ao MongoDB usando a URL do arquivo de ambiente.
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Conectado"))
    .catch((err) => console.log("MongoDB mão conectado", err))

// Monta as rotas de contato no caminho raiz '/'
app.use('/', contatoRoutes)
// Define a porta do servidor, com 3000 como padrão.
const PORT = process.env.PORT || 3000;

// Sobre o servidor escutando na porta 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})