const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const mongoose = require('mongoose')
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DATABASE Connection.....//

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connection Successfully!!..."))
    .catch((err) => {
        console.log(err);
    });



// routes

app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server started on port '+port);
});