<script setup>
import { ref, onMounted } from 'vue'

const nome = ref('')
const nomeFiltro = ref('')
const cpf = ref('')
const nomePerfil = ref('')
const usuarios = ref([])
const idEditando = ref(null)

async function cadastrar() {
  const url = idEditando.value
    ? `http://localhost:3000/usuarios/${idEditando.value}`
    : 'http://localhost:3000/usuarios'

  const method = idEditando.value ? 'PUT' : 'POST'

  await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: nome.value,
      nomePerfil: nomePerfil.value,
      cpf: cpf.value
    })
  })

  idEditando.value = null
  nome.value = ''
  nomePerfil.value = ''
  cpf.value = ''

  await carregarUsuarios()
}

async function carregarUsuarios() {
  let url = 'http://localhost:3000/usuarios'

  if (nomeFiltro.value) {
    url = `http://localhost:3000/usuarios?nome=${nomeFiltro.value}`
  }

  const resposta = await fetch(url)
  const listaUsuarios = await resposta.json()

  usuarios.value = listaUsuarios
}

async function excluirUsuario(id) {
  await fetch(`http://localhost:3000/usuarios/${id}`, {
    method: 'DELETE'
  })

  await carregarUsuarios()
}

function editarUsuario(usuario) {
  idEditando.value = usuario._id
  nome.value = usuario.nome
  nomePerfil.value = usuario.nomePerfil
  cpf.value = usuario.cpf
}

onMounted(() => {
  carregarUsuarios()
})
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

    <label>CPF:</label>
    <input type="text" v-model="cpf">
    <br>

    <button @click="cadastrar">
      {{ idEditando ? 'Salvar alteração' : 'Cadastrar' }}
    </button>

    <h3>Buscar</h3>

    <input type="text" v-model="nomeFiltro">
    <br>

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

        <button @click="excluirUsuario(usuario._id)">
          Excluir
        </button>

        <button @click="editarUsuario(usuario)">
          Editar
        </button>
      </div>
    </div>
  </div>
</template>

