var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var User = require("./models/user.js")
const app = express()
var Post = require("./models/post.js")

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
// db.collection("posts").find({},function(err,result){
//     if(err) throw err;
//     console.log(result.text);
// });

mongoose.connect(url).then((client)=>{
    const connect = client.db(Test_db);
    console.log("hi");
    const collection = connect
        .collection("posts");
    console.log("Connected");
    collection.find({}).toArray().then((ans)=>{
        console.log(ans);
    });
}).catch((err)=>{
    console.log(err.Message);
})

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
                    return res.redirect("feeds.html")
                }
                return res.redirect("login.html")
            });
        }
    })   
})
// var post_details = Post.find({})
// Post.find({}, 'Post data',(err,post_details)=>{
//     if(err){
//         return handleError(err);
//     }
//     else{
//         post_details.filter(function(arr){
//             console.log(arr.text);
//         });
//     }
// }) 

// app.get('/feeds',function(req,res,next){
//     Post.find((err,docs)=>{
//         if(!err)
//         {
//             res.render("list",{
//                 data:docs
//             });
//             console.log("Retrieved successfully");
//         }else{
//             console.log("Failed to retrieve"+err);
//         }
//     });
// });

app.get("/",(req,res)=>{
    res.set({
        "ALLow-access-ALLow-Origin": '*'
    })
    return res.redirect('index.html')
}).listen(8000);

console.log("listening on port 8000");

