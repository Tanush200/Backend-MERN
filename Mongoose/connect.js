// Mongoose.connect from another file....


const mongoose = require("mongoose");

async function mongoDB(){
    try {
        await mongoose.connect('mongodb+srv://sahatanush511:RucG6K6DPITn09qf@cluster0.q08bd.mongodb.net/tode-database')
        console.log('Connected MongoDB');
        
    } catch (error) {
        console.log(error);
        
    }

    module.exports = mongoDB;
}