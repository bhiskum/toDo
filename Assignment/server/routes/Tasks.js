var express = require('express');
var router = express.Router();
var Task = require('../models/Task');
var auth = require('../middleware/auth');

router.get('/:id?', auth, async function (req, res, next) {

    if (req.params.id) {

        Task.getTaskById(req.params.id, function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
    else {

        Task.getAllTasks(function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }

        });
    }
});
router.post('/', auth, async function (req, res) {

    Task.addTask(req, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.json('success');//or return count for 1 &amp;amp;amp; 0
        }
    });
});
router.delete('/:id', auth, async function (req, res, next) {

    Task.deleteTask(req.params.id, function (err, count) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(count);
        }

    });
});
router.put('/:id', auth,async function (req, res, next) {

    Task.updateTask(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});
module.exports = router;