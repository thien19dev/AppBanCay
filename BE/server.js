const mongoose = require('mongoose');


const atlat = "mongodb+srv://thien19dev:NW79Ic00DQyGJdb1@fall2024.etbgi.mongodb.net/AppBanCay";

const connectDB = () => {
    mongoose.connect(atlat)
        .then(()=> {
            console.log('Connect MongoDB Successfuly!');
        })
        .catch((err)=>{
            console.log('Failed: ' + err);
        })
}

module.exports = { connectDB };