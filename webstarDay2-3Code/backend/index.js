// var fs = require('fs');

// fs.readFile('demofile.txt', 'utf8', function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });

// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('Hello World!');
//   res.end();
// }).listen(8080);

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./mongodb");
const app = express();

mongoose.connect("mongodb://localhost:27017/ses", (err) => {
    if (err) console.log(err);
    else console.log("Database is Connected");
})

app.use(cors());

// parse application/json
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    const query = req.query;
    const user = await User.findOne({ name: query.name });
    if (user) {
        return res.status(200).json({
            success: true,
            response: user
        })
    }
    else {
        return res.status(400).json({
            success: false,
            message: "User not found"
        });
    }
})

app.post("/", async (req, res) => {
    const body = req.body;
    const user = new User(body);
    const response = await user.save();
    if (response) {
        return res.status(200).json({
            success: true,
            response
        });
    }
    else {
        return res.status(400).json({
            success: false
        });
    }
});

// app.get(); // Server to Client (Show)
// app.post(); // Client to Server (Add)
// app.put(); // Client to Server (whole update)
// app.patch(); // Client to Server (few fields update)
// app.delete(); // Client to Server (data delete)

app.listen(4000, (err) => {
    if (err) console.log(err);
    else console.log("Server is Running");
});