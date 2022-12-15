const express = require("express");
const path = require("path");
app = express();
console.log(path.join(__dirname, "dist"));
app.use(express.static(path.join(__dirname, "dist")));
const port = process.env.PORT || 8080;
app.listen(port);
