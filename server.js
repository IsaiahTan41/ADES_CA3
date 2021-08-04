const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")

const app = express();

const PORT = process.env.PORT ||
  5000;



app.use(express.json());

const username = "IsaiahTan";
const password = "Password1";
const cluster = "cluster0.bf22d";
const dbname = "myFirstDatabase";

//`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`

//`mongodb+srv://IsaiahTan:Password1@cluster0.bf22d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;


db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(PORT, () => {
  console.log("Server is running at port:"+ PORT);
});

app.get('/', (req, res) => {
  res.send({ yeah: "connection success" });
})  