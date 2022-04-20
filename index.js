const express = require('express');
const server = express();
const routes = require('./routes');
const db = require('./config');

server.use(express.json());
server.use(express.urlencoded({extended: false}));
// server.use("/api", routes);

db.sync({ force: true }).then(() => {
    server.listen(3000, () => {
        console.log(`Server listening at port 3000`)
    });
});
