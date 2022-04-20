const res = require('express/lib/response');
const { State } = require('../models');

const statesArray = [{ id: 1, name: 'created' }, { id: 2, name: 'won' }, { id: 3, name: 'lost' }];

// const seedFunc = async () => {
//     try {
//         const newStates = await State.bulkCreate(statesArray, { returning: true } );
//         console.log('los nuevis ', newStates)
//         return newStates;
//     } catch(err) {
//         console.log(err)
//     };
// };

const seedFunc = () => State.bulkCreate(statesArray).then((states) => State.findAll().then(statess => console.log('=????????????????????????????',statess)))

module.exports = seedFunc;