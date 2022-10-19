const express = require('express');
const router = express.Router();
const {validatorRegister, validatorLogin} = require('../validators/auth');
const {registerCtrl, loginCtrl} = require('../controllers/auth');

/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  name:
 *                      type: String
 *                  age:
 *                      type: Integer
 *                  email:
 *                      type: String
 *                  password:
 *                      type: String
 *              required:
 *                  - name
 *                  - age
 *                  - email
 *                  - password
 *              example:
 *                  name: Alan Kay
 *                  age: 25
 *                  email: example@gmail.com
 *                  password: examplePassword
 */


/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: Create a new user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: new User created
 *          400:
 *              description: bad request
 */
router.post('/register', validatorRegister, registerCtrl);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Log In
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: String
 *                          password:
 *                              type: String
 *                      example:
 *                          email: example@gmail.com
 *                          password: examplePassword
 *      responses:
 *          200:
 *              description: user loged in
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          400: 
 *              description: error log in user
 *          401: 
 *              description: password invalid
 *          404: 
 *              description: user not found
 */
router.post('/login', validatorLogin, loginCtrl);

module.exports = router;