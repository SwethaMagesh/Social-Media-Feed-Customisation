const mongoose = require("mongoose")
const schema = mongoose.Schema;

user = new schema({
    name: String,
    email: String,
    password: String
}),

User = mongoose.model('User', user);

module.exports = User;