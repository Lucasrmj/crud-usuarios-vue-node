const usuarioService = require('../services/usuarioService');

async function listar(req, res) {

    const nome = req.query.nome;

    try {
        const resultado = await usuarioService.listar(nome);
        res.send(resultado);
    } catch (erro) {
        console.error('ERRO NO LISTAR AUTOCOMPLETE', erro);
        res.status(500).send(erro.message);
    }
}

async function listarId(req, res) {
    const id = req.params.id;

    try {
        const usuario = await usuarioService.buscarPorId(id);

        res.send(usuario);
    } catch (erro) {
        res.status(404).send(erro.message);
    }
}

async function criar(req, res) {
    const nome = req.body.nome;
    const nomePerfil = req.body.nomePerfil;
    const cpf = req.body.cpf;

    try {
        const usuario = await usuarioService.criar(
            nome,
            nomePerfil,
            cpf
        );

        res.status(201).send(usuario);
    } catch (erro) {
        res.status(400).send(erro.message);
    }
}

    async function excluir(req, res) {
  try {
    const { id } = req.params;
    await usuarioService.excluir(id);
    return res.status(200).json({ mensagem: 'Utilizador removido com sucesso' });
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}


async function atualizar(req, res) {
    const {id} = req.params;
    const {nome, nomePerfil, cpf} = req.body;

    try {
        await usuarioService.atualizar(
            id,
            nome,
            nomePerfil,
            cpf
        );

        return res.status(200).send('Usuario atualizado com sucesso');
    } catch (erro) {

        if (erro.message.includes('obrigatórios')) {
            res.status(400).send(erro.message);
        } else {
            res.status(404).send(erro.message);
        }
    }
}



module.exports = {
    listar,
    listarId,
    criar,
    excluir,
    atualizar
};