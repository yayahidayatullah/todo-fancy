var express = require('express');
var router = express.Router();
var taskRouter = require('./task')
var signinRouter = require('./user')

/* GET home page. */
router.use('/task', taskRouter);
router.use('/user', signinRouter)


module.exports = router;
