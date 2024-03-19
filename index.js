const express = require("express");
const path = require("path");
const cors=require("cors")

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const server = express();


const dbPath = path.join(__dirname, "backendData.db");


let db = null;

server.use(cors())
server.use(express.json())

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    server.listen(3009, () => {
      console.log("Server Running at http://localhost:3009");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

//get all players details from table 


server.get("/players/", async (request, response) => {
    const getAllPlayersQuery = `
      SELECT
        *
      FROM
        players;`;
    const playersArray = await db.all(getAllPlayersQuery);
    response.send(playersArray);
    console.log(playersArray)
});
 