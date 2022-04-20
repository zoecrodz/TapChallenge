const { Game, State } = require('../models');

const gameController = {
    async createGame (req, res) {
        const { id } = req.params;
        console.log('---hklao?')
        try {
            const game = await Game.findOne( {where: { id } });
            const states = await State.findAll();
            console.log('----states', states)
            if (game) {
                console.log('------game', game)
                // const { id, created: createdAt, stacells, }
                res.send(game);
            }
            else {
                console.log('hi')
                const gameCreated = await Game.create({ id });
                const state = await State.findByPk(1);
                console.log('new gane', state)
                const newGame = await state.setGame(gameCreated);
                res.send(newGame);
            }   
        } catch(err) {
            console.log(err);
            // res.status(500).send(err);
        }
    }
};

module.exports = gameController;