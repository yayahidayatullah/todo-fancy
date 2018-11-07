const userModel=require('../models/user')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('757900785184-9nhtbc318pe29ncr499l9turgk0mm3k9.apps.googleusercontent.com');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10)

class User{
    static googleLogin(req,res){
        client.verifyIdToken({
            idToken: req.body.token,
            audience: '757900785184-9nhtbc318pe29ncr499l9turgk0mm3k9.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        }, function(err,data){
            
                const payload = data.getPayload();
                let userGoogle ={
                    email: payload.email,
                    name: payload.given_name
                }
                userModel.findOne({
                    email: userGoogle.email
                })
                .then(user=>{
                    if(user.length === 0){
                        userModel.create({
                            name: userGoogle.name,
                            email: userGoogle.email
                        })
                        .then(newuser=>{
                            let decoded = {
                                name: newuser.name,
                                email:newuser.email,
                            }
                            let tokenJwt = jwt.sign(decoded, process.env.secret_jwt)
                            res.status(200).json({
                                tokenJwt: tokenJwt
                            })
                        })
                        .catch(err=>{
                            res.status(500).json({
                                err
                            })
                        })
                    } else {
                        let decoded = {
                            name: user.name,
                            email:user.email,
                        }
                        let tokenJwt = jwt.sign(decoded, process.env.secret_jwt)
                        res.status(200).json({
                            tokenJwt
                        })
                    }
                })
                // console.log(payload)
            
        });
    }
    static register(req,res){
        let hash = bcrypt.hashSync(req.body.password,salt)
        let loginUser = {
            name: req.body.username,
            email: req.body.email,
            password: hash
        }
        console.log(loginUser)
        userModel.create(
            loginUser
        )
        .then(data=>{
            res.status(200).json({
                message:'Successfully added',
                data : data
            })
        })
        .catch(err=>{
            res.status(500).json({
                message: err
            })
        })
    }
    static login(req,res){
        // let hash = bcrypt.hashSync(req.body.password,salt)
        let userLogin = {
            username: req.body.username
        }
        userModel.findOne({
            name: userLogin.username
        })
        .then(function(data){
            console.log(data)
            let hasil = bcrypt.compareSync(req.body.password, data.password)
            if(hasil === true){
                let decoded = {
                    name: data.name,
                    email:data.email
                }
                let tokenJwt = jwt.sign(decoded, process.env.secret_jwt)
                res.status(200).json({
                    tokenJwt: tokenJwt
                })
            }
        })
        .catch(function(err){
            console.log(err)
        })
    }
}
module.exports= User