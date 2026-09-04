const usuarioService = require('../services/usuarioService');

function listar(req, res) {
    const resultado = usuarioService.listar();
    res.send(resultado);
}

function listarId(req, res) {
    const id = Number(req.params.id);

    try {
        const usuario = usuarioService.buscarPorId(id);
        res.send(usuario);
    } catch (erro) {
        res.status(404).send(erro.message);
    }
}

function criar(req, res) {
    const nome = req.body.nome;
    const idade = req.body.idade;

    try {
        const usuario = usuarioService.criar(nome, idade);
        res.send(usuario);
    } catch (erro) {
        res.status(400).send(erro.message);
    }
}

function excluir(req, res) {
    const id = Number(req.params.id);

    try {
        usuarioService.excluir(id);
        res.send('Excluido com sucesso');
    } catch (erro) {
        res.status(404).send(erro.message);
    }
}

function atualizar(req, res) {
    const id = Number(req.params.id);
    const nome = req.body.nome;
    const idade = req.body.idade;

    try {
        usuarioService.atualizar(id, nome, idade);
        res.send('Usuario atualizado com sucesso');
    } catch (erro) {
        if (erro.message === 'Nome e idade são obrigatórios') {
            res.status(400).send(erro.message);
        } else {
            res.status(404).send(erro.message);
        }
    }
}

function atualizarParcial(req, res) {
    const id = Number(req.params.id);
    const nome = req.body.nome;
    const idade = req.body.idade;

    try {
        usuarioService.atualizarParcial(id, nome, idade);
        res.send('Usuario atualizado com sucesso');
    } catch (erro) {
        res.status(404).send(erro.message);
    }
}

module.exports = {
    listar,
    listarId,
    criar,
    excluir,
    atualizar,
    atualizarParcial
};