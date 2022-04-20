const db = require('../config');
const S = require('sequelize');

class State extends S.Model {};

State.init({
    name: S.STRING,
    allowNull: false
}, {sequelize: db, modelName: 'state'});

module.exports = State;
