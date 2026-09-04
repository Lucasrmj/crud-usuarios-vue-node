const usuarioRepository = require('../repositories/usuarioRepository');

function listar() {
    const resultado = usuarioRepository.listar();
    return resultado;
}

function buscarPorId(id) {
    const usuario = usuarioRepository.buscarPorId(id);

    if (!usuario) {
        throw new Error('Usuario nao encontrado!');
    }

    return usuario;
}

function criar(nome, idade) {
    if (!nome || !idade) {
        throw new Error('Nome e idade são obrigatórios');
    }

    const usuario = usuarioRepository.criar(nome, idade);
    return usuario;
}

function excluir(id) {
    const resultado = usuarioRepository.excluir(id);

    if (!resultado) {
        throw new Error('Usuario nao encontrado!');
    }
}

function atualizar(id, nome, idade) {
    if (!nome || !idade) {
        throw new Error('Nome e idade são obrigatórios');
    }

    const resultado = usuarioRepository.atualizar(id, nome, idade);

    if (!resultado) {
        throw new Error('Usuario nao encontrado');
    }
}

function atualizarParcial(id, nome, idade) {
    const resultado = usuarioRepository.atualizarParcial(id, nome, idade);

    if (!resultado) {
        throw new Error('Usuario nao encontrado');
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