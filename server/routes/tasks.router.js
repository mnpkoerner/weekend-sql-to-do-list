const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
    console.log('in /tasks GET');
    const queryText = `SELECT * FROM "tasks";`
    pool.query(queryText)
    .then(function(response){
        console.log(response);
        res.send(response.rows);
    }).catch(function(error){
        console.log(error);
        res.sendStatus(500);
    })
})








module.exports = router;
