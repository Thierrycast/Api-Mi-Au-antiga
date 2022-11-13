require("dotenv").config();

const express = require("express");
const route = require("./routes");
const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(route);

app.listen(process.env.PORT || 3000);
