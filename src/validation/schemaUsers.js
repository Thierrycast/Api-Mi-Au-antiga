const yup = require("yup");

const { pt } = require("yup-locales");
const { setLocale } = require("yup");
setLocale(pt);

const schemaRegisterUser = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().required().email(),
  senha: yup.string().required().min(6).max(10).trim(),
  data: yup.date().required(),
});

module.exports = {
  schemaRegisterUser,
};
