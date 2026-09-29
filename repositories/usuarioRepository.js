const conectarBanco = require('../config/database');
const { ObjectId } = require('mongodb');


async function obterColecao() {
    const db = await conectarBanco();
    return db.collection('usuarios')
    
}

async function buscarPorNome(nome) {
  const colecao = await obterColecao();

  const usuarios = await colecao.aggregate([
    {
      $search: {
        index: 'default', 
        autocomplete: {
          query: nome,
          path: 'nome',
          fuzzy: {
            maxEdits: 1 
          }
        }
      }
    }
  ]).toArray();

  return usuarios;
}

async function listar(idade) {

    const colecao = await obterColecao();
    const filtro = {};

    if (idade){
        filtro.idade = Number(idade);
    }

    const usuarios = await colecao.find(filtro).toArray();
    return usuarios;
    
}

async function buscarPorId(id) {
  const colecao = await obterColecao();
  const usuario = await colecao.findOne({ _id: new ObjectId(id) });
  return usuario;
}

async function criar(nome, nomePerfil, cpf) {
    
    const colecao = await obterColecao();
    const novoUsuario ={
        nome: nome,
        nomePerfil: nomePerfil,
        cpf: cpf
    
    };
    const resultado = await colecao.insertOne(novoUsuario);
    return resultado;
}

async function excluir(id) {
    
    const colecao = await obterColecao();
    const resultado = await colecao.deleteOne({ _id: new ObjectId(id) });
    return resultado;
}

async function atualizar(id, nome, nomePerfil, cpf) {
    
    const colecao = await obterColecao();
    const resultado = await colecao.updateOne(
        {_id: new ObjectId(id)},
        {$set: { nome: nome, 
                nomePerfil: nomePerfil,
                cpf: cpf
         }
        }
    );
    return resultado;
}



module.exports = {
    listar,
    buscarPorNome,
    buscarPorId,
    criar,
    excluir,
    atualizar
};