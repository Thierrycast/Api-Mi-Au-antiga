const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const { uploadImage, updateImage } = require("../database/supabase");
const {
  schemaRegisterUser,
  schemaUpdateUser,
} = require("../validation/schemaUsers");

const registerUser = async (req, res) => {
  const { email, senha, foto } = req.body;

  try {
    await schemaRegisterUser.validate(req.body);

    const searchEmail = await knex("usuarios")
      .select("email")
      .where("email", email);
    if (searchEmail.length > 0) {
      return res.status(400).json("O email já existe.");
    }

    const passwordEncrypted = await bcrypt.hash(senha, 10);

    const userDatas = {
      ...req.body,
      senha: passwordEncrypted,
      foto: "",
    };

    const userRegistration = await knex("usuarios")
      .insert(userDatas)
      .returning("*");
    if (userRegistration.length === 0) {
      return res.status(400).json("O usuario não foi cadastrado.");
    }
    const userId = userRegistration[0].id;

    if (foto) {
      const response = await uploadImage("users", userId, foto);

      if (response.error) {
        return res.status(400).json(error.message);
      }
      const updateImage = await knex("usuarios")
        .update({ foto: response.data.publicUrl })
        .where("id", userId);
    }

    return res
      .status(200)
      .json({ message: "O usuario foi cadastrado com sucesso!" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const detailUser = async (req, res) => {
  const { id } = req.usuario;

  try {
    const userData = await knex("usuarios")
      .select(
        "id",
        "nome",
        "email",
        "data",
        "telefone",
        "cep",
        "endereco",
        "complemento",
        "cidade",
        "estado",
        "status",
        "foto",
        "bio"
      )
      .where("id", id);
    return res.status(200).json(userData[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const updateUser = async (req, res) => {
  const { email, foto, senha } = req.body;
  const { usuario } = req;

  try {
    await schemaUpdateUser.validate(req.body);

    const search = await knex("usuarios")
      .where("id", "!=", usuario.id)
      .andWhere("email", email);

    if (search.length > 0) {
      return res
        .status(400)
        .json("Já existe este e-mail cadastrado por outro usuário.");
    }

    const passwordEncrypted = await bcrypt.hash(senha, 10);

    const response = await updateImage("users", usuario.id, foto);

    if (response.error) {
      return res.status(400).json(error.message);
    }
    console.log(response);
    const updateData = await knex("usuarios")
      .update({
        ...req.body,
        senha: passwordEncrypted,
        foto: response.data.publicUrl,
      })
      .where("id", usuario.id)
      .returning("*");

    console.log(updateData);

    if (updateData.length === 0) {
      return res.status(400).json("Falha na atualização dos dados do usuário.");
    }

    return res.status(200).json("Atualização realizada com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  registerUser,
  detailUser,
  updateUser,
};
