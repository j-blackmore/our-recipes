const mongoose = require('mongoose');

const DB_URI =
    process.env.ENV === 'TEST'
        ? 'mongodb://127.0.0.1:27017/test_our_recipes'
        : process.env.ENV !== 'PROD'
        ? 'mongodb://127.0.0.1:27017/our_recipes'
        : process.env.MONGODB_URI;

const connect = async (verbose = true) => {
    await mongoose
        .connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(
            () => {
                if (verbose)
                    console.log('MongoDB database connection established');
            },
            err => {
                if (verbose) console.log('Problem connecting to the DB');
            }
        );
};

const disconnect = async (verbose = true) => {
    await mongoose.disconnect().then(
        () => {
            if (verbose) console.log('Disconnected successfully');
        },
        err => {
            if (verbose) console.log('Could not disconnect from database');
        }
    );
};
module.exports = {
    connect: connect,
    disconnect: disconnect
};
