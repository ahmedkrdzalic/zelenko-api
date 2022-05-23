const express = require('express');
const app = express();
const cors = require('cors');
const cookieParaser = require('cookie-parser');
const path = require('path')


const bodyParser = require('body-parser');


app.use(express.json());
app.use(cookieParaser());
app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true,
}));
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))



const db = require('./models');

//Routes
const usersRouter = require('./routes/Users');
app.use('/user', usersRouter);
const menusRouter = require('./routes/Menus');
app.use('/menus', menusRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("running on port: 3001")
    });
})


