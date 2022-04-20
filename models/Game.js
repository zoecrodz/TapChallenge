const db = require('../config');
const S = require('sequelize');

class Game extends S.Model {};

Game.init({
    created: {
        type: S.DATE,
        allowNull: false
    },
    cells: {
        type: S.ARRAY(S.TEXT)
    }
}, {sequelize: db, modelName: 'game'});

module.exports = Game;
