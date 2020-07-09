const mongoose = require('mongoose');
const colors = require('colors');
const env = require('dotenv').config();

// Connection URL
// const url = 'mongodb://localhost:27017/eseg';
connectDB = async() => {
    const conn = await mongoose.connect(process.env.DB_URI + '/' + process.env.DB_NAME, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    console.log(`Mongodb Connected ${conn.connection.host}:${conn.connection.port}`.cyan.underline.bold)
};

module.exports = connectDB;