const usuarioRepository = require('../repositories/usuarioRepository');

async function listar(nome) {

    if (nome) {

        const resultado = await usuarioRepository.buscarPorNome(nome);
        return resultado;

    } 
    else {
        const resultado = await usuarioRepository.listar();
        return resultado;
    }

}

async function buscarPorId(id) {
    const usuario = await usuarioRepository.buscarPorId(id);

    if (!usuario) {
        throw new Error('Usuario nao encontrado!');
    }

    return usuario;
}

async function criar(nome, nomePerfil, cpf) {
    if (!nome || !nomePerfil) {
        throw new Error('Nome, cpf e nome de perfil são obrigatórios');
    }

    const usuario = await usuarioRepository.criar(nome, nomePerfil, cpf );
    return usuario;
}

async function excluir(id) {
    const resultado = await usuarioRepository.excluir(id);

    if (!resultado) {
        throw new Error('Usuario nao encontrado!');
    }
}

async function atualizar(id, nome, nomePerfil, cpf) {
    if (!nome || !nomePerfil || !cpf) {
        throw new Error('Nome, nome de perfil e cpf são obrigatórios');
    }

    const resultado = await usuarioRepository.atualizar(
        id,
        nome,
        nomePerfil,
        cpf
    );

    if (resultado.matchedCount === 0) {
        throw new Error('Usuario nao encontrado!');
    }
}


module.exports = {
    listar,
    buscarPorId,
    criar,
    excluir,
    atualizar
};