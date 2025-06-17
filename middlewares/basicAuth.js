const { base } = require("../models/Contato");

function basicAuth(req, res, next){
    const auth = req.headers['authorization'];

    if(!auth || !auth.startsWith('Basic ')){
        return res.status(401).send('Autenficação requerida')
    }

    const base64Credentials = credentials.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const [username, password] = auth.split(':');
    const usuarioValido = usuario === "Carlos"
    const senhaValida = senha === "1234"

    if(!usuarioValido || !senhaValida){
        return res.status(401).send('Credenciais Invalidas')
    }else{
        next()
    }




    next()
}

module.exports = basicAuth