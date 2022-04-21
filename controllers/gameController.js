const { Game, State } = require('../models');

const formatValues = (data) => {
        const { dataValues, state } = data
        const { id, cells, createdAt } = dataValues;
        const formattedData = {
            game: {
                id,
                created: createdAt,
                state: {
                    code: state.id,
                    description: state.name
                }
            },
            cells: cells || []
        };
        return formattedData;
}

const formattedStates = {};

const findStates = async () => {
    const states = await State.findAll();
    for (let index = 0; index < states.length; index++) {
        const element = states[index].dataValues;
        formattedStates[element.id] = { id: element.id, name: element.name };
    }
}

findStates()

const gameController = {
    async findOrCreate (req, res) {
        const { id } = req.params;
        try {
            const game = await Game.findOne({ where: { id } } );
            if (game) {
                const { stateId, dataValues } = game;
                const state = formattedStates[stateId];
                const foundGame = formatValues({ dataValues, state });
                res.send(foundGame);
            }
            else {
                const newGame = await Game.create({ id });
                const state = await State.findByPk(1);
                await state.addGame(newGame);
                const gameCreated = await Game.findByPk(id);
                const { dataValues } = gameCreated;
                const formattedData = formatValues({dataValues, state: state.dataValues});
                res.send(formattedData);
            }   
        } catch(err) {
            res.status(500).send(err);
        }
    },
    async getGames (req, res) {
        try {
            const arrayGames = [];
            const games = await Game.findAll();
            for (let index = 0; index < games.length; index++) {
                const state = State.findByPk(games[index].dataValues.stateId)
                //quería usar este array (formattedStates) comentado que definí más arriba, pero tengo un problema de asincronismo,
                //no espera a que findStates se ejecute satisfactoriamente, a no ser que genere un cambio en el código.
                // const state = formattedStates[games[index].dataValues.stateId];
                const { dataValues } = games[index];
                const formattedGame = formatValues({ dataValues, state });
                arrayGames.push(formattedGame);
            }
            res.send(arrayGames); 
        } catch(err) {
            res.status(500).send(err);
        }
    },
    async saveGame (req, res) {
        const { body } = req;
        const { game, cells } = body;
        const { id, created, state } = game;
        gameToSave = {
            id,
            cells, 
            created
        };
        try {
            const savedGame = await Game.create(gameToSave);
            const foundState = await State.findByPk(state.code);
            await foundState.addGame(savedGame);
            res.status(200).send(body);
        } catch(err) {
            res.status(500).send(err.name);
        };
    }
};

module.exports = gameController;