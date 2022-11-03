const express = require('express');
const router = express.Router();
const {getCharacters, createCharacter, getCharacter, updateCharacter, deleteCharacter} = require('../controllers/character');
const {validatorCreateItem, validatorGetItem} = require('../validators/character');
const {authMiddleware} = require('../middlewares/session');

/**
 * @swagger
 *  components:
 *      schemas:
 *          Character:
 *              type: object
 *              properties:
 *                  name:
 *                      type: String
 *                  age:
 *                      type: Integer
 *                  weight:
 *                      type: Float
 *                  history:
 *                      type: String
 *                  mediaId:
 *                      type: Integer
 *                  films:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: String
 *                              creation_date:
 *                                  type: Date
 *                              calification:
 *                                  type: Integer
 *                              mediaId:
 *                                  type: Integer
 *                              genre_id:
 *                                  type: Integer
 *                  required:
 *                      - name
 *                      - age
 *                      - weight
 *                      - history
 *                      - mediaId
 *                  example:
 *                      name: Alan Kay
 *                      age: 25
 *                      weight: 70
 *                      history: a history
 *                      mediaId: 2
 *                      films:
 *                          title: The momie
 *                          creation_date: 08-05-2005
 *                          calification: 3
 *                          mediaId: 2
 *                          genre_id: 3 
 */


/**
 * @swagger
 * /api/character:
 *  get:
 *      summary: List characters
 *      tags: [Character]
 *      responses:
 *          200:
 *              description: character listed
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Character'
 *          400:
 *              description: error get characters
 */
router.get('/', authMiddleware, getCharacters);

/**
 * @swagger
 * /api/character/{id}:
 *  get:
 *      summary: Detail character
 *      tags: [Character]
 *      parameters:
 *          in: path
 *          name: id
 *          schema:
 *              type: Integer
 *          required: true 
 *      responses:
 *          200:
 *              description: character detailed
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Character'
 *          404: 
 *              description: character not dound
 *          400:
 *              description: error get character
 */
router.get('/:id', validatorGetItem, authMiddleware, getCharacter);

/**
 * @swagger
 * /api/character:
 *  post:
 *      summary: Create a new character
 *      tags: [Character]
 *      requestBody:
 *          required: true
 *          content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Character'
 *      responses:
 *          201:
 *              description: new Character created
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Character'
 *          400:
 *              description: error create character
 */
router.post('/', validatorCreateItem, authMiddleware, createCharacter);

/**
 * @swagger
 * /api/character/{id}:
 *  put:
 *      summary: Update character
 *      tags: [Character]
 *      parameters:
 *          in: path
 *          name: id
 *          schema:
 *              type: Integer
 *          required: true 
 *      requestBody:
 *          required: true
 *          content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Character'
 *      responses:
 *          200:
 *              description: character updated
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Character'
 *          404: 
 *              description: character not dound
 *          400:
 *              description: error update character
 */
router.put('/:id', validatorGetItem, authMiddleware, updateCharacter);

/**
 * @swagger
 * /api/character/{id}:
 *  delete:
 *      summary: Delete character
 *      tags: [Character]
 *      parameters:
 *          in: path
 *          name: id
 *          schema:
 *              type: Integer
 *          required: true 
 *      responses:
 *          200:
 *              description: character deleted
 *          404: 
 *              description: character not dound
 *          400:
 *              description: error get character
 */
router.delete('/:id', validatorGetItem, authMiddleware, deleteCharacter);

module.exports  = router;