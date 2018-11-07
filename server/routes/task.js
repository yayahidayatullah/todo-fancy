var express = require('express');
var router = express.Router();
var taskController = require('../controllers/controller')

/* GET users listing. */
router.post('/create',taskController.insertTask)
router.get('/show',taskController.showAll);

module.exports = router;
