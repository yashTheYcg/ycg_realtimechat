const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// path to config.env file
dotenv.config({path:path.join(__dirname,'../config.env')});

const mongooseUrl = process.env.DATABASE_URL;

const connect_to_mongo = async () => {
    try {
        await mongoose.connect(mongooseUrl, { dbName: 'chatApplication' });
        mongoose.set('debug', true);
        console.log("Connected to mongo successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {connect_to_mongo}