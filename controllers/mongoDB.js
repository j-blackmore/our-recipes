const mongoose = require("mongoose");

const DB_URI = process.env.ENV === 'DEV' 
    ? "mongodb://localhost:27017/our_recipes" 
    : process.env.MONGODB_URI;

const connect = () => {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const connection = mongoose.connection;

    connection.on("error", () => {
        console.log("There was a problem trying to connect to the DB");
    });

    connection.on("open", () => {
        console.log("MongoDB database connection established");
    });
};

module.exports.connect = connect;
