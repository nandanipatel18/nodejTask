const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();
require('./passport')(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

const db = 'mongodb://localhost:27017/myDataBase';


mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  // Routes
  app.use('', require('./routes/authRoutes'))
app.use('', require('./routes/postRoutes'))



const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
