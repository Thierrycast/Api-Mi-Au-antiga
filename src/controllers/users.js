const knex = require("../database/connection");
const bcrypt = require("bcrypt");

const { schemaRegisterUser } = require("../validation/schemaUsers");

const registerUser = async (req, res) => {
  const {
    nome,
    email,
    data,
    senha,
    telefone,
    CEP,
    endereco,
    complemento,
    cidade,
    estado,
    status,
    foto,
    bio,
  } = req.body;

  try {
    await schemaRegisterUser.validate(req.body);

    const searchEmail = await knex("usuarios")
      .select("email")
      .where("email", email);

    if (searchEmail.length > 0) {
      return res.status(400).json({ message: "O email já existe." });
    }

    const passwordEncrypted = await bcrypt.hash(senha, 10);

    console.log(passwordEncrypted);

    const userDatas = { ...req.body, senha: passwordEncrypted };
    const userRegistration = knex("usuarios").insert(userDatas);

    if (userRegistration.length === 0) {
      return res.status(400).json({ message: "O usuario não foi cadastrado." });
    }

    return res
      .status(200)
      .json({ message: "O usuario foi cadastrado com sucesso!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  registerUser,
};
