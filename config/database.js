require('dotenv').config();

const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URI;
const client = new MongoClient(url);

let conexaoDb;

async function conectarBanco() {
    if(!conexaoDb){
        await client.connect();
        conexaoDb = client.db();
        console.log('Mongodb conectado com sucesso')
    }
    return conexaoDb;
}

module.exports = conectarBanco;