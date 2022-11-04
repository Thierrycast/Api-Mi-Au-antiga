const knex = require("../database/connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(400)
      .json(
        "É necessário um token autenticado válido para acessar este recurso"
      );
  }

  try {
    const token = authorization.replace("Bearer", "").trim();

    if (!token) {
      return res.status(400).json("Token não informado");
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const search = await knex("usuarios")
      .select("id", "nome")
      .where({ id })
      .first();

    if (!search) {
      return res.status(400).json("Usuário não encontrado");
    }

    req.usuario = search;

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = validateToken;
