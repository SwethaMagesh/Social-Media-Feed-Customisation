const mongoose = require("mongoose")
const schema = mongoose.Schema;

post = new schema({
    date:String,
    time: String,
    author: String,
    text: String,
    likes: String,
    category: String
}),

Post = mongoose.model('posts', post);

module.exports = Post;