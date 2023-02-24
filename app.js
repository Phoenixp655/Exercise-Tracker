const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connecttDB = require('./config/DBConfig') 

connecttDB();
app.set('view engine', 'ejs');
app.set('public', express.static(__dirname + '/public'));

app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use(cors({optionsSuccessStatus: 200}))





app.use('/api/users', require('./router/userRouter'));




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))