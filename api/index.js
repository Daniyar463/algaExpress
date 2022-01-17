require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const users = require('./app/users');
const market=require('./app/market');
const config = require('./config');
const packages = require('./app/packages');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const port = 8000;

app.use('/users', users);
app.use('/market',market);
app.use('/packages', packages);

const run = async () => {
    await mongoose.connect(config.db.url);

    app.listen(port, () => {
        console.log('Port start on port: ', port);
    });

    exitHook(() => {
        console.log('exiting');
        mongoose.disconnect();
    });
};

run().catch(e => console.log(e));