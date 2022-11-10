const express = require("express");
const route = express();

const login = require("./controllers/login");
const authorization = require("./middleware/authorization");
const { registerUser, detailUser, updateUser } = require("./controllers/users");

route.get("/", (req, res) => {
  console.log("------------------ENTRAMOS CARAI----------------- ");
  return res.status(200).send("VOCE CONSEGUIU!!");
});

route.post("/users", registerUser);

route.post("/login", login);

route.use(authorization);

route.get("/users", detailUser);
route.put("/users", updateUser);

module.exports = route;
