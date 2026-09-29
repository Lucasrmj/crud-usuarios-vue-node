const conectarBanco = require('./config/database');

const primeirosNomes = ['Lucas', 'Pedro', 'Ana', 'Mariana', 'Carlos', 'Beatriz', 'Gabriel', 'Juliana', 'Rafael', 'Fernanda'];
const sobrenomes = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes'];

function gerarItemAleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function gerarCpfAleatorio() {
  const n = () => Math.floor(Math.random() * 10);
  return '' + n() + n() + n() + '.' + n() + n() + n() + '.' + n() + n() + n() + '-' + n() + n();
}

function gerarUsuarios(quantidade) {
  const lista = [];

  for (let i = 0; i < quantidade; i++) {
    const nomeEscolhido = gerarItemAleatorio(primeirosNomes);
    const sobrenomeEscolhido = gerarItemAleatorio(sobrenomes);
    const numeroAleatorio = Math.floor(100 + Math.random() * 900);

    lista.push({
      nome: nomeEscolhido + ' ' + sobrenomeEscolhido,
      nomePerfil: nomeEscolhido.toLowerCase() + '_' + sobrenomeEscolhido.toLowerCase() + numeroAleatorio,
      cpf: gerarCpfAleatorio()
    });
  }

  return lista;
}

async function popular(total = 50) {
  try {
    const db = await conectarBanco();
    const colecao = db.collection('usuarios');

    // 1. Limpa os registros errados que foram gerados como texto literal
    await colecao.deleteMany({ nome: { $regex: 'nomeEscolhido' } });

    // 2. Insere os novos dados combinados corretamente
    const novosUsuarios = gerarUsuarios(total);
    const resultado = await colecao.insertMany(novosUsuarios);

    console.log(`Sucesso: ${resultado.insertedCount} utilizadores inseridos corretamente!`);
    process.exit(0);
  } catch (erro) {
    console.error('Erro ao popular banco:', erro);
    process.exit(1);
  }
}

popular(50);