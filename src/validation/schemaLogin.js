const yup = require("./yupConfig");

const schemaLogin = yup.object().shape({
  email: yup.string().required().email(),
  senha: yup.string().required().min(6).max(10).trim(),
});

module.exports = schemaLogin;
