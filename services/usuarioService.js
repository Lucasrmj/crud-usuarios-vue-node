const usuarioRepository = require('../repositories/usuarioRepository');

async function listar() {
    const resultado = await usuarioRepository.listar();

    return resultado;
}

async function buscarPorId(id) {
    const usuario = await usuarioRepository.buscarPorId(id);

    if (!usuario) {
        throw new Error('Usuario nao encontrado!');
    }

    return usuario;
}

async function criar(nome, idade) {
    if (!nome || !idade) {
        throw new Error('Nome e idade são obrigatórios');
    }

    const usuario = await usuarioRepository.criar(nome, idade);

    return usuario;
}

async function excluir(id) {
    const resultado = await usuarioRepository.excluir(id);

    if (!resultado) {
        throw new Error('Usuario nao encontrado!');
    }
}

async function atualizar(id, nome, idade) {
    if (!nome || !idade) {
        throw new Error('Nome e idade são obrigatórios');
    }

    const resultado = await usuarioRepository.atualizar(
        id,
        nome,
        idade
    );

    if (!resultado) {
        throw new Error('Usuario nao encontrado!');
    }
}

async function atualizarParcial(id, nome, idade) {
    const resultado = await usuarioRepository.atualizarParcial(
        id,
        nome,
        idade
    );

    if (!resultado) {
        throw new Error('Usuario nao encontrado!');
    }
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    excluir,
    atualizar,
    atualizarParcial
};