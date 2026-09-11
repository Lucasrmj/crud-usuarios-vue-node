const usuarioService = require('../services/usuarioService');

async function listar(req, res) {
    try {
        const resultado = await usuarioService.listar();

        res.send(resultado);
    } catch (erro) {
        res.status(500).send(erro.message);
    }
}

async function listarId(req, res) {
    const id = Number(req.params.id);

    try {
        const usuario = await usuarioService.buscarPorId(id);

        res.send(usuario);
    } catch (erro) {
        res.status(404).send(erro.message);
    }
}

async function criar(req, res) {
    const nome = req.body.nome;
    const idade = req.body.idade;

    try {
        const usuario = await usuarioService.criar(
            nome,
            idade
        );

        res.status(201).send(usuario);
    } catch (erro) {
        res.status(400).send(erro.message);
    }
}

async function excluir(req, res) {
    const id = Number(req.params.id);

    try {
        await usuarioService.excluir(id);

        res.send('Usuario excluido com sucesso');
    } catch (erro) {
        res.status(404).send(erro.message);
    }
}

async function atualizar(req, res) {
    const id = Number(req.params.id);
    const nome = req.body.nome;
    const idade = req.body.idade;

    try {
        await usuarioService.atualizar(
            id,
            nome,
            idade
        );

        res.send('Usuario atualizado com sucesso');
    } catch (erro) {

        if (erro.message === 'Nome e idade são obrigatórios') {
            res.status(400).send(erro.message);
        } else {
            res.status(404).send(erro.message);
        }
    }
}

async function atualizarParcial(req, res) {
    const id = Number(req.params.id);

    const nome = req.body.nome;
    const idade = req.body.idade;

    try {
        await usuarioService.atualizarParcial(
            id,
            nome,
            idade
        );

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