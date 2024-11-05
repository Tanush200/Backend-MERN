const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId

const Users = new Schema({
    name:String,
    email: {type:String,unique:true},
    password : String
})

const Todos = new Schema({
    title:String,
    done:Boolean,
    UserId:ObjectId
})


const UserModel = mongoose.model('users',Users);
const TodosModel = mongoose.model('todos',Todos);


module.exports = {
    UserModel:UserModel,
    TodosModel:TodosModel
}