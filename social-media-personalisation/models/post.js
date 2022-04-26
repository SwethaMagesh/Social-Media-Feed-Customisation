const mongoose = require("mongoose")
const schema = mongoose.Schema;

post = new schema({
    id: String,
    date: String,
    time : String,
    author: String,
    text: String,
    category : String
}),

Post = mongoose.model('Post', post);

module.exports = Post;