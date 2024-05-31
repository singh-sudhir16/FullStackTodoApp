const mongoose= require('mongoose');
// const { boolean } = require('zod');

mongoose.connect('mongodb+srv://singhsa-6:sudhirbase@cluster0.6nwi1b4.mongodb.net/todo-app')
const todoSchema = mongoose.Schema({
    title : String ,
    description : String,
    hasCompleted : Boolean
})

const todo =mongoose.model("todo-app" , todoSchema)

module.exports ={
    todo
}