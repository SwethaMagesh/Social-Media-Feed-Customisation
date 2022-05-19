const mongoose = require("mongoose")
const schema = mongoose.Schema;

final_result = new schema({
    date: String,
    time: String,
    author: String,
    text: String,
    category: String,
    User_id: String  
}),

Final_result = mongoose.model('final_results', final_result);

module.exports = Final_result;