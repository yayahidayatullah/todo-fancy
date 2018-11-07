var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

/* GET users listing. */
router.post('/loginGoogle',userController.googleLogin)
router.post('/register',userController.register)
router.post('/login',userController.login)
module.exports = router;
