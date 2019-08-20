//login&register
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const gravatar = require('gravatar');
const User = require("../../models/User")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const passport = require("passport")

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/runoob";

// mongoose.connect('mongodb://127.0.0.1:27017/runoob',{ useNewUrlParser: true });

// //用来监听数据库是否连接成功（还有其他的监听方法，比如disconnected,error）
// mongoose.connection.on('connected', function () {
//     console.log('connected');
// });


//api/users/test api接口
// router.get('/test', (req, res) => {
//     res.json({ mag: 'login work' })
// })

router.post('/register', (req, res) => {
    // res.json({ mag: 'login work' })
    // console.log(req.body);
    // console.log(User);


    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json( "邮箱已被注册" )
            } else {
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'})
                const newUSer = new User({
                    name: req.body.name,
                    email: req.body.email,
                    identity: req.body.identity,
                    avatar,
                    password: req.body.password

                })

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUSer.password, salt, (err, hash) => {
                        // Store hash in your password DB.
                        if (err) throw err
                        newUSer.password = hash
                        newUSer.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))

                    });
                });






            }
        })

})
//@token jwt password
router.post('/login', (req, res) => {
    const email=req.body.email;
    const password = req.body.password;
    User.findOne({email})
    .then(user=>{
        if(!user){
            return res.status(404).json("用户不存在")
        }
        bcrypt.compare(password,user.password)
        .then(isMatch=>{
            if(isMatch){
                const rule={
                    id:user.id,
                    name:user.name,
                    avatar:user.avatar,
                    identity:user.identity,
                    email:user.email
                }
                //jwt.sign(规则，加密名字，过期时间，箭头函数)
                jwt.sign(rule,"secret",{expiresIn:3600},(err,token)=>{
                    if(err) throw err
                    res.json({
                        success:true,
                        token:"Bearer "+token
                    })
                })
                // res.json({msg:"success"})
            }else{
                return res.status(404).json("密码错误")  
            }
        })
    })
})

router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    })
})


module.exports = router