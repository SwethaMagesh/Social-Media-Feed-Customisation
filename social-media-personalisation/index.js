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


app.post("/signup",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var cpassword = req.body.cpassword;

    if(password == cpassword){
        var data = {
            "name":name,
            "email":email,
            "password":password
        }
    
        db.collection('users').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Record inserted");
        });
    }

    return res.redirect('login.html')
})

// function insertPosts(){
//     data = []
//     db.collection('posts').insertMany(data,(err,collection)=>{
//         if(err){
//             throw err;
//         }
//         console.log("Records posts inserted");
//     });
// }
app.post('/login', (req,res)=>{

    var email = req.body.email;
    var password = req.body.password;

    User.find({email:email}, 'email password',(err,user_details)=>{
        if(err){
            return handleError(err);
        }
        else{
            user_details.filter(function(arr){
                if(arr.password == password){
                    console.log("LoggedIn successfully");                    
                    return res.redirect("home.html")
                }
                return res.redirect("login.html")
            });
        }
    })   
})

app.get("/",(req,res)=>{
    res.set({
        "ALLow-access-ALLow-Origin": '*'
    })
    return res.redirect('index.html')
}).listen(8000);

console.log("listening on port 8000");

