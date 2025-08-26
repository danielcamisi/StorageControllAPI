const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  const token = authHeader.split(" ")[1]; // O token estará no formato "Bearer <token>"

  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret); // Verifica o token
    req.userId = decoded.id; // Salva o ID do usuário no objeto `req`
    next(); // Permite que a requisição continue
  } catch (error) {
    return res.status(400).json({ msg: "Token inválido!" });
  }
};

module.exports = verifyToken;