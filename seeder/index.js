const res = require('express/lib/response');
const { State } = require('../models');

const statesArray = [{ id: 1, name: 'created' }, { id: 2, name: 'won' }, { id: 3, name: 'lost' }];

const seedFunc = async () => {
    try {
        const newStates = await State.bulkCreate(statesArray, { returning: true } );
        return newStates;
    } catch(err) {
        throw err;
    };
};

seedFunc();

module.exports =  seedFunc;