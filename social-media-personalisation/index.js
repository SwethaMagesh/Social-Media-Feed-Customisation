var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var User = require("./models/user.js")
var Post = require("./models/post.js")
var Final_result = require("./models/Final_result.js")
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
// var posts_fetched = fetchPosts(30);


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
// function fetchPosts(N){
//     console.log("fetching");
//     Post.find({category:'C0'}, 'author text',(err,post_details)=>{
//         if(err){
//             console.log("hi, err", err)
//             return handleError(err);
//         }
//         else{
//             // post_details.filter(function(arr){
//             //     console.log(arr);
//             // });
//             console.log(post_details.length)
//             return JSON.parse(JSON.stringify(post_details));
//         }
//     }).limit(N)
//  }
// function insertPosts(){
//     data = []
//     db.collection('posts').insertMany(data,(err,collection)=>{
//         if(err){
//             throw err;
//         }
//         console.log("Records posts inserted");
//     });
// }
// insertPosts();
app.get('/feeds/:limit', (req,res) => {
    console.log("hi")
    Final_result.find({User_id:"17"}, 'author text date time ',(err,final_results)=>{
        if(err){
            console.log("hi, err", err)
            return handleError(err);
        }
        else{
            
            res.json(JSON.parse(JSON.stringify(final_results)));
        }
    }).limit(req.params.limit)
})

// app.get('/feeds/:id/:number_of_likes',(req)=>{
//     console.log("hi")
//     Post.update({id:req.params.id},{$set:{Likes:req.params.number_of_likes}},function(err,result){
//         if(err){
//             console.log("Err",err);
//             return handleError(err);
//         }
//         else{
//             console.log(req.params.id);
//             console.log(req.params.number_of_likes);
//             console.log("Updated successfully");
//         }
//     })
// })

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

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html')
}).listen(8000);

console.log("listening on port 8000");
