const express = require('express');
const router = express.Router();
const {getCharacters, createCharacter, getCharacter, updateCharacter, deleteCharacter} = require('../controllers/character');

router.get('/', getCharacters);

router.get('/:id', getCharacter);

router.post('/', createCharacter);

router.put('/:id', updateCharacter);

router.delete('/:id', deleteCharacter);

module.exports  = router;