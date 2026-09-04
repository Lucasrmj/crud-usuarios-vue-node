let usuarios = [
    {
        id: 1,
        nome: 'Lucas',
        idade: 20
    },
    {
        id: 2,
        nome: 'João',
        idade: 25
    }
];

let proximoId = 3;

function listar() {
    return usuarios;
}

function buscarPorId(id) {
    return usuarios.find(usuario => usuario.id === id);
}

function criar(nome, idade) {
    const usuario = {
        id: proximoId,
        nome: nome,
        idade: idade
    };

    usuarios.push(usuario);
    proximoId++;

    return usuario;
}

function excluir(id) {
    const index = usuarios.findIndex(usuario => usuario.id === id);

    if (index === -1) {
        return false;
    }

    usuarios.splice(index, 1);

    return true;
}

function atualizar(id, nome, idade) {
    const usuario = usuarios.find(usuario => usuario.id === id);

    if (!usuario) {
        return false;
    }

    usuario.nome = nome;
    usuario.idade = idade;

    return true;
}

function atualizarParcial(id, nome, idade) {
    const usuario = usuarios.find(usuario => usuario.id === id);

    if (!usuario) {
        return false;
    }

    if (nome) {
        usuario.nome = nome;
    }

    if (idade) {
        usuario.idade = idade;
    }

    return true;
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    excluir,
    atualizar,
    atualizarParcial
};