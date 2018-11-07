const mongoose = require('mongoose')
const Schema = mongoose.Schema

var taskSchema = new Schema({
    name: String,
    description: String,
    status: String,
    due_date: String
})
var Tasks = mongoose.model('Task', taskSchema);
module.exports = Tasks