const CharacterModel = require('./mysql/character');
const FilmModel = require('./mysql/film');
const GenreModel = require('./mysql/genre');
const Storage = require('./mysql/storage');

// character's image relationship
CharacterModel.belongsTo(Storage, {
    foreignKey: 'mediaId',
    as: 'image'
});

// film's image relationship
FilmModel.belongsTo(Storage, {
    foreignKey: 'mediaId',
    as: 'image'
});

//film's genres relationship
FilmModel.belongsTo(GenreModel, {
    foreignKey: 'genre_id',
    as: 'genre'
});

// genre's image relationship
GenreModel.belongsTo(Storage, {
    foreignKey: 'mediaId',
    as: 'image'
});

//genre's films relationship
GenreModel.hasMany(FilmModel, {
    foreignKey: 'genre_id',
    as: 'films'
});

// character's films relationship
CharacterModel.belongsToMany(FilmModel, {
    through:'character_film',
    foreignKey: 'character_id',
    as: 'films'
});

//film's characters relationship
FilmModel.belongsToMany(CharacterModel, {
    through: 'character_film',
    foreignKey: 'film_id',
    as: 'characters'
});