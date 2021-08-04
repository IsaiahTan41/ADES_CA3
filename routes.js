const express = require("express");
const userModel = require("./models");
const app = express();


app.post("/add_user", async (request, response) => {
    const username = req.query.name;
    const score = req.query.score;
    const reqJSON = JSON.parse(`{"name":"${username}","score":${score}}`);
    const user = new userModel(reqJSON);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/users", async (request, response) => {
    const users = await userModel.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

module.exports = app;