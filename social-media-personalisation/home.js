var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var User = require("./models/user.js")
var Post = require("./models/post.js")
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

const url = `mongodb+srv://Deepthi_GS:Deepthi_1423@cluster0.95u1g.mongodb.net/Test_db?retryWrites=true&w=majority`

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in connecting to db"));
db.once('open',()=>console.log("Connected to Database"));

console.log("hi it' s home.js")



app.get("/",(req,res)=>{
    res.set({
        "ALLow-access-ALLow-Origin": '*'
    })
    return res.redirect('home.html')
}).listen(8000);

console.log("listening on port 8000");

