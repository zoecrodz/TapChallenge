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
            cells
        };
        return formattedData;
}

const gameController = {
    async findOrCreate (req, res) {
        const { id } = req.params;
        try {
            const game = await Game.findOne({ where: { id } } );
            if (game) {
                const { stateId, dataValues } = game;
                const state = await State.findByPk(stateId);
                const foundGame = formatValues({ dataValues, state: state.dataValues });
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
            const games = await Game.findAll();
            const formattedData = [];
            games.map(async (game) => {
                const state = await State.findByPk(game.stateId);
                const formattedGame = formatValues(game);
                formattedData.push({formattedGame, state})});
            res.send(games); 
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