const express = require('express');

//setting express
const app = express();

//mongo databse connection
var dbConnect = require('monk')("mongodb://localhost/auric");
var dataTable = dbConnect.get('data');

app.get('/', function (req, res) {
    res.send("Hello Operator");
});

app.get('/operator', async function (req, res) {

    try {
        const queryResp = await dataTable.find({}, 'operator');
        res.status(200);
        res.send({ statusCode: 200, msg: "success", data: queryResp });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.send({ statusCode: 500, msg: "Internal server error" });
    }
});

app.get('/operatorGameType', async function (req, res) {

    try {
        const queryResp = await dataTable.find({}, 'operatorGameType');
        res.status(200);
        res.send({ statusCode: 200, msg: "success", data: queryResp });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.send({ statusCode: 500, msg: "Internal server error" });
    }
});

app.get('/operatorName', async function (req, res) {
    const operator = req.query.operator;
    const operatorGameType = req.query.operatorGameType;

    if (operator && operatorGameType) {
        try {
            const queryResp = await dataTable.find({operator, operatorGameType}, 'operatorName');
            res.status(200);
            res.send({ statusCode: 200, msg: "success", data: queryResp });
        } catch (e) {
            res.status(500);
            console.log(e);
            res.send({ statusCode: 500, msg: "Internal server error" });
        }
    } else{
        res.status(400);
        res.send({ statusCode: 400, msg: "please provide all details"})
        return;
    }
});

//exporting this file so that it can be used at other places
module.exports = app;