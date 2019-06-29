const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//Setting routes
const users = require('./routes/api/users');

const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello Jeee');
});

//DB config
const keys = require('./config/keys');

//Connect to MongoDB
mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

//Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

//User Routers
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});