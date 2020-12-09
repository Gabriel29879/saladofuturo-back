require('dotenv/config');

const express = require('express');
const mainRouter = require('./routes/main');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(cors());

app.use(mainRouter);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to the database.');
    app.listen(process.env.PORT);
})
.catch(err => {
    console.log(err);
});
