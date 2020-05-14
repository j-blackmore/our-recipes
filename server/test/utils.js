// * Helper functions for use ONLY in testing

const mongoose = require('mongoose');

const initEmptyDatabase = async () => {
    await mongoose.connection.db.dropCollection('recipes');
    await mongoose.connection.db.createCollection('recipes');
};

module.exports = {
    initEmptyDatabase: initEmptyDatabase
};
