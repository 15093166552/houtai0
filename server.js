const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const passport = require("passport")
const app = express();

const users=require("./routes/api/users")
const profiles=require("./routes/api/profiles")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(passport.initialize())
require("./config/passport")(passport)



mongoose.connect('mongodb://127.0.0.1:27017/runoob',{ useNewUrlParser: true });

//用来监听数据库是否连接成功（还有其他的监听方法，比如disconnected,error）
mongoose.connection.on('connected', function () {
    console.log('connected');
});


 
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//   if (err) throw err;
//   const collection = db.db("runoob").collection("users")
//   collection.save({
//     name:"张三",
//     age:19
//     },(err,result)=>{
//         db.close()
//     })
// });


 


// app.get("/", (req, res) => {
//     res.send("hello world")
// })

app.use("/api/users",users)
app.use("/api/profiles",profiles)


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running at port ${port}`);

})