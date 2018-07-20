const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./routes/user.route');
const task = require('./routes/task.route');

const PORT = 3000;

const mongooes = require('mongoose');
mongooes.connect('mongodb://localhost:27017/ProjectManagement');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', user);
app.use('/task', task);

app.listen(PORT,function(){
    console.log('Server  is running on PORT ',PORT);
});