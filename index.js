const express = require('express');
const app = express();
const cors = require('cors');
const cookieParaser = require('cookie-parser');

app.use(express.json());
app.use(cookieParaser());
app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true,
}));

const db = require('./models');

//Routes
const usersRouter = require('./routes/Users');
app.use('/user', usersRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("running on port: 3001")
    });
})


