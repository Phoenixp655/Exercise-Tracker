const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connecttDB = require('./config/DBConfig') 

//@ connect database
connecttDB();

//@ set view engine but not use yet
app.set('view engine', 'ejs');

//@ set default public static folder
app.set('public', express.static(__dirname + '/public'));


//@ body urlencoded
app.use(express.json())
app.use(express.urlencoded({extended: false}));

//@ allow cors so freecodecamp can accest  
app.use(cors({optionsSuccessStatus: 200}))




//@ userRouter
app.use('/api/users', require('./router/userRouter'));




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))