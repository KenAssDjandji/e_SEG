const express = require('express');
const path = require('path');
const ejs = require('ejs');
const colors = require('colors');
const errorHandler = require('./middleware/error').errorHandler;
const bodyParser = require('body-parser');
const rootDir = require('./helpers/path');
// const errorController = require('./controllers/error')
const connectBD = require('./config/database');
//Connect to DB
connectBD();
const app = express()
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs')
app.set('views', 'views')

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const errorHandlers = require('./middleware/error');
// const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));
// app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use(errorHandlers);
// app.use(errorController.get404Page)
// const getDb = require('./config/database').getDb;
// const db = getDb();

// const findDocuments = function(db, callback) {
//     // Get the documents collection
//     const collection = db.collection('users');
//     // Find some documents
//     collection.find({}).toArray(function(err, docs) {
//         assert.equal(err, null);
//         console.log("Found the following records");
//         console.log(docs)
//         callback(docs);
//     });
// }


const server = app.listen(port,
    () => console.log(`Listening on the port ${port}`.yellow.bold)
);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Erro: ${err}`.white.bgRed.underline);
    server.close(() => process.exit(1));
});