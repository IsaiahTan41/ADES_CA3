
// Import necessary packages
const express = require('express');
const bodyParser = require('body-parser');

// create and configure the express app
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// Database Connection Info
const MongoClient = require('mongo-db').MongoClient;

// the URL we copied from earlier. Replace username and password with what you created in the initial steps
const url = 'mongodb+srv://cluster0.bf22d.mongodb.net/ADESCA3';
let db;

// The index route
app.get('/', function(req, res) {
   res.send('Sweet Game Leaderboard API!');
});

// Route to create new player
app.post('/players', async function(req, res) {
    // get information of player from POST body data
    let { username, score } = req.body;
 
    // check if the username already exists
    const alreadyExisting = await db
        .collection('players')
        .findOne({ username: username });
 
    if (alreadyExisting) {
        res.send({ status: false, msg: 'player username already exists' });
    } else {
        // create the new player
        await db.collection('players').insertOne({ username, score });
        console.log(`Created Player ${username}`);
        res.send({ status: true, msg: 'player created' });
    }
 });

// Connect to the database with [url]
(async () => {
   let client = await MongoClient.connect(
       url,
       { useNewUrlParser: true }
   );

   db = client.db('Players');

   app.listen(PORT, async function() {
       console.log(`Listening on Port ${PORT}`);
       if (db) {
           console.log('Database is Connected!');
       }
   });
})();