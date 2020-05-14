const app = require('./app');
const mongoDB = require('./controllers/mongoDB');

const PORT = process.env.PORT || 4000;

mongoDB.connect();

app.listen(PORT, () => {
    console.log('Server is running on Port: ' + PORT);
});
