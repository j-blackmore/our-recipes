// * Helper functions for use ONLY in testing

const mongoose = require('mongoose');

const initEmptyDatabase = async () => {
    const { db } = mongoose.connection;

    const currentCollections = await db.listCollections({ name: 'recipes' });
    if (currentCollections.readableLength > 0) {
        await mongoose.connection.db.dropCollection('recipes');
    }
    await mongoose.connection.db.createCollection('recipes');
};

module.exports = {
    initEmptyDatabase: initEmptyDatabase
};
