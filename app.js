require('dotenv').config();
const cors = require('cors');
const express = require('express');
const {dbConnectMySql} = require('./config/mysql');
require('./src/models/association');
const path = require('path');

//Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Disney Proyect Node",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3001"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./src/routes/*.js")}`]
};

//Settings
const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api', require('./src/routes'));
app.use(
    '/api-doc', 
    swaggerUI.serve, 
    swaggerUI.setup(swaggerJsDoc(swaggerSpec))
    );


app.listen(PORT, () => {
    console.log(`Server listen port ${PORT}`);
});

//MySql connection
dbConnectMySql(); 