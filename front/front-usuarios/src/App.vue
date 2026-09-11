<script setup>
import { ref, onMounted } from 'vue'

const nome = ref('')
const idade = ref('')
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
        idade: idade.value
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
        idade: idade.value
      })
    });

  }

  idEditando.value = null;
  nome.value = '';
  idade.value = '';

  await carregarUsuarios();
}

async function carregarUsuarios() {
  const resposta = await fetch('http://localhost:3000/usuarios');

  const listaUsuarios = await resposta.json();

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
  idade.value = usuario.idade;
  idEditando.value = usuario.id;
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
    <input
      type="text"
      v-model="nome"
    >
    <br>
    <label>Idade:</label>
    <input
      type="number"
      v-model="idade"
    >

    <button @click="cadastrar">
      {{ idEditando ? 'Salvar alteração' : 'Cadastrar' }}
    </button>

    <h2>Usuários cadastrados</h2>

    <div
      v-for="usuario in usuarios"
      :key="usuario.id"
    >

      <p>
        {{ usuario.nome }} - {{ usuario.idade }} anos
      </p>

      <button @click="excluirUsuarios(usuario.id)">
        Excluir
      </button>

      <button @click="editarUsuario(usuario)">
        Editar
      </button>

      <input
        type="number"
        v-model="novasIdades[usuario.id]"
        placeholder="Nova idade"
      >

      <button @click="alterarIdade(usuario.id)">
        Alterar idade
      </button>

    </div>

  </div>
</template>