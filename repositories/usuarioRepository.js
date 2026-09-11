const conexao = require('../config/database');

async function listar() {
    const [resultado] = await conexao.query(
        'SELECT * FROM usuarios'
    );

    return resultado;
}

async function buscarPorId(id) {
    const [resultado] = await conexao.query(
        'SELECT * FROM usuarios WHERE id = ?',
        [id]
    );

    return resultado[0];
}

async function criar(nome, idade) {
    const [resultado] = await conexao.query(
        'INSERT INTO usuarios (nome, idade) VALUES (?, ?)',
        [nome, idade]
    );

    return {
        id: resultado.insertId,
        nome: nome,
        idade: idade
    };
}

async function excluir(id) {
    const [resultado] = await conexao.query(
        'DELETE FROM usuarios WHERE id = ?',
        [id]
    );

    return resultado.affectedRows > 0;
}

async function atualizar(id, nome, idade) {
    const [resultado] = await conexao.query(
        'UPDATE usuarios SET nome = ?, idade = ? WHERE id = ?',
        [nome, idade, id]
    );

    return resultado.affectedRows > 0;
}

async function atualizarParcial(id, nome, idade) {
    const usuario = await buscarPorId(id);

    if (!usuario) {
        return false;
    }

    const novoNome = nome !== undefined ? nome : usuario.nome;
    const novaIdade = idade !== undefined ? idade : usuario.idade;

    const [resultado] = await conexao.query(
        'UPDATE usuarios SET nome = ?, idade = ? WHERE id = ?',
        [novoNome, novaIdade, id]
    );

    return resultado.affectedRows > 0;
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    excluir,
    atualizar,
    atualizarParcial
};