const express = require("express");
const route = express();

const { registerUser } = require("./controllers/users");

route.post("/users", registerUser);

module.exports = route;
