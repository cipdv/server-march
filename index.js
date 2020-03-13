const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
require ('./services/passport');
require ('./routes/authRoutes')(app);
const keys = require ('./config/keys');
require ('./models/User');

mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 5000;
app.listen(PORT);