const express = require("express");
const route = express();

const { registerUser, attUser } = require("./controllers/users");

route.post("/users", registerUser);
route.put("/users", attUser);

module.exports = route;
