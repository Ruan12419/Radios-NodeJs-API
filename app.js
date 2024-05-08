const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Conexão com o banco de dados Mongo através do mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/radios", { useNewUrlParser: true }).then( () => {
    console.log("Database connected")},
     err => {console.log("Can not connect to the database " + err)});

// Importação das rotas
const radioRoute = require("./routes/radioRoute");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/radio", radioRoute);

// Rota inicial, redireciona para o arquivo HTML
app.get("/", function(req, res){
    res.send("Running!");
});


app.listen(3000, function(){
    console.log("Listening on port 3000!");
});