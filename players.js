const express = require('express');

//setting express
const app = express();

//mongo databse connection
var dbConnect = require('monk')("mongodb://localhost/auric");
var dataTable = dbConnect.get('data');

app.get('/', async function (req, res) {
    const operator = req.query.operator;
    const operatorGameType = req.query.operatorGameType;
    const operatorName = req.query.operatorName;

    if (operator && operatorGameType && operatorName) {
        try {
            const operators = await dataTable.find({ operator, operatorGameType, operatorName }, 'dfsSlatePlayers');
            const playersList = [];
            for (let i = 0; i < operators.length; i++) {
                const thisOperator = operators[0];
                playersList.push(...thisOperator.dfsSlatePlayers);
            }
            res.status(200);
            res.send({ statusCode: 200, msg: "success", data: playersList });
        } catch (e) {
            res.status(500);
            console.log(e);
            res.send({ statusCode: 500, msg: "Internal server error" });
        }
    } else {
        res.status(400);
        res.send({ statusCode: 400, msg: "please provide all details" })
        return;
    }
});

app.get('/best', async function (req, res) {
    const operator = req.query.operator;
    const operatorGameType = req.query.operatorGameType;
    const operatorName = req.query.operatorName;

    if (operator && operatorGameType && operatorName) {
        try {
            const operators = await dataTable.find({ operator, operatorGameType, operatorName }, 'dfsSlatePlayers');
            const playersList = [];
            for (let i = 0; i < operators.length; i++) {
                const thisOperator = operators[i];
                playersList.push(...thisOperator.dfsSlatePlayers);
            }

            let bestScore = playersList[0].fantasyPoints
            for (let i = 0; i < playersList.length; i++) {
                if (playersList[i].fantasyPoints > bestScore) {
                    bestScore = playersList[i].fantasyPoints;
                }
            }
            res.status(200);
            res.send({ statusCode: 200, msg: "success", bestScore });
        } catch (e) {
            res.status(500);
            console.log(e);
            res.send({ statusCode: 500, msg: "Internal server error" });
        }
    } else {
        res.status(400);
        res.send({ statusCode: 400, msg: "please provide all details" })
        return;
    }
});

//exporting this file so that it can be used at other places
module.exports = app;