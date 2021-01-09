const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');


//gets ALL tasks from DB
router.get('/', (req, res) => {
    console.log('in /tasks GET');
    const queryText = `SELECT * FROM "tasks";`
    pool.query(queryText)
        .then(function (response) {
            console.log(response);
            res.send(response.rows);
        }).catch(function (error) {
            console.log(error);
            res.sendStatus(500);
        })
})

//sorts on priority
router.get('/priority', (req, res) => {
    console.log('sort by priority');
    const queryText = `SELECT * FROM "tasks" ORDER BY "priority" DESC;`
    pool.query(queryText)
        .then(function (response) {
            console.log(response);
            res.send(response.rows);
        }).catch(function (error) {
            console.log(error);
            res.sendStatus(500);
        })
})
//sorts on priority reverse order
router.get('/priorityRev', (req, res) => {
    console.log('sort by priority rev');
    const queryText = `SELECT * FROM "tasks" ORDER BY "priority" ASC;`
    pool.query(queryText)
        .then(function (response) {
            console.log(response);
            res.send(response.rows);
        }).catch(function (error) {
            console.log(error);
            res.sendStatus(500);
        })
})
//sorts by est_time short to long
router.get('/time', (req, res) => {
    console.log('sort by priority');
    const queryText = `SELECT * FROM "tasks" ORDER BY "est_time" ASC;`
    pool.query(queryText)
        .then(function (response) {
            console.log(response);
            res.send(response.rows);
        }).catch(function (error) {
            console.log(error);
            res.sendStatus(500);
        })
})
//sorts by est_time long to short
router.get('/timeRev', (req, res) => {
    console.log('sort by priority');
    const queryText = `SELECT * FROM "tasks" ORDER BY "est_time" DESC;`
    pool.query(queryText)
        .then(function (response) {
            console.log(response);
            res.send(response.rows);
        }).catch(function (error) {
            console.log(error);
            res.sendStatus(500);
        })
})

//sorts z-a
router.get('/rev', (req, res) => {
    console.log('sort by priority');
    const queryText = `SELECT * FROM "tasks" ORDER BY "task" DESC;`
    pool.query(queryText)
        .then(function (response) {
            console.log(response);
            res.send(response.rows);
        }).catch(function (error) {
            console.log(error);
            res.sendStatus(500);
        })
})
//sorts z-a
router.get('/alph', (req, res) => {
    console.log('sort by priority');
    const queryText = `SELECT * FROM "tasks" ORDER BY "task" ASC;`
    pool.query(queryText)
        .then(function (response) {
            console.log(response);
            res.send(response.rows);
        }).catch(function (error) {
            console.log(error);
            res.sendStatus(500);
        })
})

//sends new task to DB
router.post('/', (req, res) => {
    console.log('in /tasks POST');
    //constructing two variables to send data to server
    //data not enumerated will take default values
    const queryData = [req.body.task, req.body.priority, req.body.est];
    const queryText = `
        INSERT INTO "tasks" ("task", "priority", "est_time")
        VALUES ($1, $2, $3);
    `;
    pool.query(queryText, queryData)
        .then(function (response) {
            console.log(response);
            res.sendStatus(200);
        }).catch(function (error) {
            console.log(error);
            res.sendStatus(500);
        })
});

//PUT request, will "mark task as complete"
//when something goes to the specific ID of
//an item on the list, that item's status
//changes from false (uncomplete) to true (complete)

router.put('/:id', (req, res) => {
    console.log('in put');
    const id = req.params.id;
    let time = req.body.time;
    const queryText = `
        UPDATE "tasks"
        SET "act_time" = $1, "status" = true
        WHERE "id" = $2;
    `
    pool.query(queryText, [time, id])
        .then(function (response) {
            console.log(response);
            res.sendStatus(200);
        }).catch(function (error) {
            console.log(error);
            res.sendStatus(500);
        })
})

//DELTE will take an incomplete or complete
//task out of the database

router.delete('/:id', (req, res) => {
    console.log('in DELETE');
    const id = req.params.id;
    const queryText = `
        DELETE FROM "tasks"
        WHERE "id" = $1;
    `;
    pool.query(queryText, [id])
        .then(function (response) {
            console.log(response)
            res.sendStatus(204);
        }).catch(function (error) {
            console.log(error);
            res.sendStatus(500)
        })
})





module.exports = router;
