const express = require('express');
const router = express.Router();
const { getFilms, getFilm, createFilm, updateFilm, deleteFilm } = require('../controllers/film');
const {validatorCreateItem, validatorGetItem} = require('../validators/film');
const {authMiddleware} = require('../middlewares/session');

/**
 * @swagger
 *  components:
 *      schemas:
 *          Film:
 *              type: object
 *              properties:
 *                  title:
 *                      type: String
 *                  creation_date:
 *                      type: Date
 *                  calification:
 *                      type: Integer
 *                  mediaId:
 *                      type: Integer
 *                  genre_id:
 *                      type: Integer
 *                  characters:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: String
 *                              age:
 *                                  type: Integer
 *                              weight:
 *                                  type: Float
 *                              history:
 *                                  type: String
 *                              mediaId:
 *                                  type: Integer
 *                  required:
 *                      - title
 *                      - creation_date
 *                      - calification
 *                      - mediaId
 *                      - genre_id
 *                  example:
 *                      title: The momie
 *                      creation_date: 05-08-2005
 *                      calification: 3
 *                      mediaId: 2
 *                      genre_id: 3
 *                      characters:
 *                          name: Alan Key
 *                          age: 25
 *                          weight: 70
 *                          history: a history
 *                          mediaId: 2
 */


/**
 * @swagger
 * /api/film:
 *  get:
 *      summary: List films
 *      tags: [Film]
 *      responses:
 *          200:
 *              description: films listed
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Film'
 *          400: 
 *              description: error get films
 */
router.get('/', authMiddleware, getFilms);

/**
 * @swagger
 * /api/film/{id}:
 *  get:
 *      summary: Detail film
 *      tags: [Film]
 *      parameters:
 *          in: path
 *          name: id
 *          schema:
 *              type: Integer
 *          required: true 
 *      responses:
 *          200:
 *              description: film detailed
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Film'
 *          404: 
 *              description: film not dound
 *          400: 
 *              description: error get films
 */
router.get('/:id', validatorGetItem, authMiddleware, getFilm);

/**
 * @swagger
 * /api/film:
 *  post:
 *      summary: Create a new film
 *      tags: [Film]
 *      requestBody:
 *          required: true
 *          content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Film'
 *      responses:
 *          201:
 *              description: new Film created
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Film'
 *          400: 
 *              description: error create films
 */
router.post('/', validatorCreateItem, authMiddleware, createFilm);

/**
 * @swagger
 * /api/film/{id}:
 *  put:
 *      summary: Update film
 *      tags: [Film]
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
 *                      $ref: '#/components/schemas/Film'
 *      responses:
 *          200:
 *              description: film updated
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Film'
 *          404: 
 *              description: film not dound
 *          400: 
 *              description: error update films
 */
router.put('/:id', validatorGetItem, authMiddleware, updateFilm);

/**
 * @swagger
 * /api/film/{id}:
 *  delete:
 *      summary: Delete film
 *      tags: [Film]
 *      parameters:
 *          in: path
 *          name: id
 *          schema:
 *              type: Integer
 *          required: true 
 *      responses:
 *          200:
 *              description: film deleted
 *          404: 
 *              description: film not found
 *          400: 
 *              description: error delete films
 */
router.delete('/:id', validatorGetItem, authMiddleware, deleteFilm);


module.exports = router;