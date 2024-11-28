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



// // Import dotenv
// const dotenv = require('dotenv');
//
// // Load file .env
// dotenv.config();
//
// // Sử dụng biến môi trường
// const mongoURI = process.env.MONGO_URI;
// const port = process.env.PORT || 3000;
//
// console.log('Mongo URI:', mongoURI);
// console.log('App running on port:', port);
