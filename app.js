require('dotenv').config();
const cors = require('cors');
const express = require('express');
const {dbConnectMySql} = require('./config/mysql');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api', require('./routes'));

app.listen(PORT, () => {
    console.log(`Server listen port ${PORT}`);
});

dbConnectMySql(); 