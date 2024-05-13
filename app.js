const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Conexão com o banco de dados Mongo através do mongoose
mongoose.Promise = global.Promise;
/*
mongoose.connect("mongodb://localhost:27017/radios", { useNewUrlParser: true }).then( () => {
    console.log("Database connected")},
     err => {console.log("Can not connect to the database " + err)});

     */

     
const uri = "mongodb+srv://ruanlsilva:Ruanpassword@clusterrl.ehyiwt8.mongodb.net/?retryWrites=true&w=majority&appName=ClusterRL";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('SIGHUP', cleanup);

async function cleanup() {
  try {
    console.log('\nGracefully shutting down. Disconnecting from MongoDB...');
    await mongoose.disconnect();
    console.log('Successfully disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Error while disconnecting from MongoDB:', error);
    process.exit(1);
  }
}

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error(error);
  }
}
run().catch(console.dir);



// Importação das rotas
const radioRoute = require("./routes/radioRoute");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/radio", radioRoute);

// Rota inicial, redireciona para o arquivo HTML
app.get("/", function(req, res){
    //res.send("Running!");
    res.sendFile(path.join(__dirname, 'addRadio.html'));
});


app.listen(3000, function(){
    console.log("Listening on port 3000!");
});