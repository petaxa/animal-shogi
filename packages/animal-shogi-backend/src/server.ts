const { Server } = require("boardgame.io/server");
import { animalShogi } from "../../animal-shogi-core";

const server = Server({ games: [animalShogi] });

server.run(8000);
