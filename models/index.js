const State = require('./State');
const Game = require('./Game');

Game.hasOne(State);

module.exports = { State, Game };