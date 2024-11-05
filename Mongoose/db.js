const mongoose = require("mongoose");  // 1.require mongoose through npm i mongoose
const Schema = mongoose.Schema; // 2.Define schema
const ObjectId = mongoose.ObjectId // 3. define ObjectId

const Users = new Schema({       // 4. Define schemas 
    name:String,  
    email: {type:String,unique:true},
    password : String
})

const Todos = new Schema({
    title:String,
    done:Boolean,
    UserId:ObjectId
})


const UserModel = mongoose.model('users',Users);  //(collection Name , Schema) by using mongoose.model
const TodosModel = mongoose.model('todos',Todos);


module.exports = {
    UserModel:UserModel,
    TodosModel:TodosModel
}