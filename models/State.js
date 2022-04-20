const db = require('../config');
const S = require('sequelize');

class State extends S.Model {};

State.init({
    id: { primaryKey: true, type: S.INTEGER},
    name: S.STRING
}, {sequelize: db, modelName: 'state'});


module.exports = State;
