<script setup>
import { ref, onMounted } from 'vue'

const nome = ref('')
const nomeFiltro = ref('')
const cpf = ref('')
const nomePerfil = ref('')
const usuarios = ref([])
const idEditando = ref(null)
const novasIdades = ref({})

async function cadastrar() {

  if (idEditando.value) { 
  
    await fetch(`http://localhost:3000/usuarios/${idEditando.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome.value,
        nomePerfil: nomePerfil.value,
        cpf: cpf.value
      })
    });

  } else {

    await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome.value,
        nomePerfil: nomePerfil.value,
        cpf: cpf.value
      })
    });

  }
  console.log('A submeter:', { nome: nome.value, nomePerfil: nomePerfil.value, cpf: cpf.value });
  idEditando.value = null;
  nome.value = '';
  nomePerfil.value = '';
  cpf.value = '';

  await carregarUsuarios();
}

async function carregarUsuarios() {
  let url = ('http://localhost:3000/usuarios');
  if (nomeFiltro.value) {
    url = `http://localhost:3000/usuarios?nome=${nomeFiltro.value}`;
  }
  console.log('Chamando Url:', url);

  const resposta = await fetch(url);
  const listaUsuarios = await resposta.json();
  console.log('Dados que voltaram do banco', listaUsuarios);
  usuarios.value = listaUsuarios;

}

onMounted(() => {
  carregarUsuarios();
});

async function excluirUsuarios(id) {

  await fetch(`http://localhost:3000/usuarios/${id}`, {
    method: 'DELETE'
  });

  carregarUsuarios();
}

function editarUsuario(usuario) {
  nome.value = usuario.nome;
  nomePerfil.value = usuario.nomePerfil;
  cpf.value = usuario.cpf;
  idEditando.value = usuario._id;
}

async function alterarIdade(id) {

  await fetch(`http://localhost:3000/usuarios/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      idade: novasIdades.value[id]
    })
  });

  carregarUsuarios();
}
</script>

<template>
  <div>

    <h1>Cadastro de usuários</h1>

    <label>Nome:</label>
    <input type="text" v-model="nome">
    <br>
    <label>Nome do Perfil:</label>
    <input type="text" v-model="nomePerfil">
    <br>
    <label>cpf:</label>
    <input type="text" v-model="cpf">

    <button @click="cadastrar">
      {{ idEditando ? 'Salvar alteração' : 'Cadastrar' }}
    </button>

    <br>

    <h3>Buscar</h3>
    <input type="text" v-model="nomeFiltro"> <br>
    <button @click="carregarUsuarios">
      Buscar
    </button>

    <h2>Usuários cadastrados</h2>
    <div v-if="usuarios.length > 0">
    <div v-for="usuario in usuarios" :key="usuario._id">
    
      <p>
        {{ usuario.nome }} <br>
         {{ usuario.nomePerfil }} <br>
         {{ usuario.cpf }}
      </p>

      <button @click="excluirUsuarios(usuario._id)">
        Excluir
      </button>

      <button @click="editarUsuario(usuario._id)">
        Editar
      </button>

      <input type="number" v-model="novasIdades[usuario._id]" placeholder="Nova idade">

      <button @click="alterarIdade(usuario._id)">
        Alterar idade
      </button>
      </div>
      </div> 
      <p v-else>
        Nenhum utilizador encontrado com essa idade.
      </p> 
    </div>

</template>