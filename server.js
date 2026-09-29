const express = require('express');
const cors = require('cors');
const conectarBanco = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

const usuariosRoutes = require(
    './routes/usuarioRoutes'
);

app.use(
    '/usuarios',
    usuariosRoutes
);

app.listen(3000, async () => {
    try{
        await conectarBanco()/
        console.log('Servidor rodando na porta 3000');
    }catch(erro){
        console.error('Falha ao conectar ao mongoDB', erro.message);
    }
});