/**
 * formatação de respostas da API, garantindo que todas as saídas sigam um padrão consistente.
 */

/**
 * Envia uma resposta JSON padronizada.
 @param {object} res
 @param {number} statusCode
 @param {string} alert
 @param {string} message
 @param {object|array|null} [data=null]
 */

const sendResponse = (res, statusCode, alert, message, data = null) => {
  // Monta o objeto de resposta no formato padrão//.
  const responseObject = {
    alert,
    message,
    data,
  };

  // Envia a resposta com o status e o corpo definidos.
  res.status(statusCode).json(responseObject);
};

module.exports = sendResponse;
