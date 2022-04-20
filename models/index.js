const State = require('./State');
const Game = require('./Game');

State.hasMany(Game);

module.exports = { State, Game };