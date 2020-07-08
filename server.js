const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const rootDir = require('./helpers/path');
const errorController = require('./controllers/error')
const mongoConnect = require('./config/database').mongoConnect;


const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', 'views')

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
// db.execute('SELECT * FROM users')
//     .then(result => console.log(result))
//     .catch(err => console.log(err))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));
app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(errorController.get404Page)



mongoConnect(() => {
    app.listen(port, () => console.log(`Listening on the port ${port}`))
})