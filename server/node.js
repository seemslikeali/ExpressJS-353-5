'use strict';
// load package
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')
var mysql = require('mysql')
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
// sql
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'assignment',
    password: 'admin123',
    port: '3306'

});

app.get('/connect', (req, res) => {

    con.connect(function (err) {
        if (err) console.log(err);
        console.log("Connected!");
    });

    res.send("ok");
});
app.get('/end', (req, res) => {

    con.end(function (err) {
        if (err) console.log(err);
        console.log("off");
    });

    res.send("ok");
});

app.get('/createTable', (req, res) => {
    var sql = "CREATE TABLE `assignment`.`posts` (`topic` VARCHAR(45) NOT NULL,`data` TEXT(400) NOT NULL,`timestamp` datetime DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`topic`));";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });


    res.send("ok");
});


function postmesseges(topic, data) {
    console.log("hellos");
    var sql = `INSERT INTO posts (topic, data) VALUES ('${topic}','${data}');`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("values added...");
    });
}


app.get('/table', function (req, res) {
    con.query("SELECT * FROM posts", function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});


app.post("/insert", (req, res) => {
    console.log("were here")
    var topic = req.body.topic;
    var data = req.body.data;

    con.query(`INSERT INTO assignment.posts (topic, data) VALUES  ('${topic}','${data}');`, (err, res) => {
        if (err) throw err;
        console.log(res)
    })
})

app.listen(PORT, HOST);

console.log('up and running');
