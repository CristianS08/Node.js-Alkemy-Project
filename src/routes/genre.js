const express = require('express');
const router = express.Router();
const { getGenres, getGenre, createGenre, updateGenre, deleteGenre } = require('../controllers/genre');
const {validatorCreateItem, validatorGetItem} = require('../validators/genre');
const {authMiddleware} = require('../middlewares/session');

/**
 * @swagger
 *  components:
 *      schemas:
 *          Genre:
 *              type: object
 *              properties:
 *                  name:
 *                      type: String
 *                  mediaId:
 *                      type: Integer
 *              required:
 *                  - name
 *                  - mediaId
 *              example:
 *                  name: Suspense
 *                  mediaId: 2
 */


/**
 * @swagger
 * /api/genre:
 *  get:
 *      summary: List genres
 *      tags: [Genre]
 *      responses:
 *          200:
 *              description: genres listed
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Genre'
 *          400:
 *              description: error get genres
 */
router.get('/', authMiddleware, getGenres);

/**
 * @swagger
 * /api/genre/{id}:
 *  get:
 *      summary: Detail genre
 *      tags: [Genre]
 *      parameters:
 *          in: path
 *          name: id
 *          schema:
 *              type: Integer
 *          required: true 
 *      responses:
 *          200:
 *              description: genre detailed
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Genre'
 *          404: 
 *              description: genre not dound
 *          400: 
 *              description: error get genre
 */
router.get('/:id', validatorGetItem, authMiddleware, getGenre);

/**
 * @swagger
 * /api/genre:
 *  post:
 *      summary: Create a new genre
 *      tags: [Genre]
 *      requestBody:
 *          required: true
 *          content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Genre'
 *      responses:
 *          201:
 *              description: new Genre created
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Genre'
 *          400: 
 *              description: error create genre
 */
router.post('/', validatorCreateItem, authMiddleware, createGenre);

/**
 * @swagger
 * /api/genre/{id}:
 *  put:
 *      summary: Update genre
 *      tags: [Genre]
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
 *                      $ref: '#/components/schemas/Genre'
 *      responses:
 *          200:
 *              description: genre updated
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Genre'
 *          404: 
 *              description: genre not dound
 *          400: 
 *              description: error update genre
 */
router.put('/:id', validatorGetItem, authMiddleware, updateGenre);

/**
 * @swagger
 * /api/genre/{id}:
 *  delete:
 *      summary: Delete genre
 *      tags: [Genre]
 *      parameters:
 *          in: path
 *          name: id
 *          schema:
 *              type: Integer
 *          required: true 
 *      responses:
 *          200:
 *              description: genre deleted
 *          404: 
 *              description: genre not dound
 *          400: 
 *              description: error delete genre
 */
router.delete('/:id', validatorGetItem, authMiddleware, deleteGenre);


module.exports = router;