const express = require('express');
const app = express();


app.use(express.json());

const db = require('./models');

//Routes
const subcategoriesRouter = require('./routes/Subcategories');
app.use('/subcategories', subcategoriesRouter);
const categoriesRouter = require('./routes/Categories');
app.use('/categories', categoriesRouter);
const reportsRouter = require('./routes/Reports');
app.use('/reports', reportsRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("running on port: 3001")
    });
})


