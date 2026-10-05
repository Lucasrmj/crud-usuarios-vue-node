```vue
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

  cancelarEdicao()
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

function cancelarEdicao() {
  idEditando.value = null
  nome.value = ''
  nomePerfil.value = ''
  cpf.value = ''
}

onMounted(() => {
  carregarUsuarios()
})
</script>

<template>
  <div class="container">

    <header class="header">
      <h1>Cadastro de usuários</h1>
      <p>Gerencie os usuários cadastrados</p>
    </header>

    <div class="content-grid">

      <!-- Formulário -->
      <div class="card">

        <h2>
          {{ idEditando ? 'Editar usuário' : 'Cadastrar usuário' }}
        </h2>

        <div class="form-group">
          <label>Nome:</label>
          <input type="text" v-model="nome">
        </div>

        <div class="form-group">
          <label>Nome do Perfil:</label>
          <input type="text" v-model="nomePerfil">
        </div>

        <div class="form-group">
          <label>CPF:</label>
          <input type="text" v-model="cpf">
        </div>

        <div class="actions">

          <button class="btn-primary" @click="cadastrar">
            {{ idEditando ? 'Salvar alteração' : 'Cadastrar' }}
          </button>

          <button
            v-if="idEditando"
            class="btn-secondary"
            @click="cancelarEdicao"
          >
            Cancelar
          </button>

        </div>

      </div>

      <!-- Lista de usuários -->
      <div class="card">

        <h2>Usuários cadastrados</h2>

        <div class="search-bar">

          <input
            type="text"
            v-model="nomeFiltro"
            placeholder="Buscar por nome..."
          >

          <button class="btn-search" @click="carregarUsuarios">
            Buscar
          </button>

        </div>

        <div v-if="usuarios.length > 0" class="table-wrapper">

          <table class="user-table">

            <thead>
              <tr>
                <th>Nome</th>
                <th>Perfil</th>
                <th>CPF</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>

              <tr
                v-for="usuario in usuarios"
                :key="usuario._id"
              >

                <td class="font-bold">
                  {{ usuario.nome }}
                </td>

                <td>
                  <span class="badge">
                    {{ usuario.nomePerfil }}
                  </span>
                </td>

                <td>
                  {{ usuario.cpf }}
                </td>

                <td class="actions-cell">

                  <button
                    class="btn-action"
                    @click="editarUsuario(usuario)"
                  >
                    Editar
                  </button>

                  <button
                    class="btn-delete"
                    @click="excluirUsuario(usuario._id)"
                  >
                    Excluir
                  </button>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

        <div v-else class="empty-state">
          Nenhum usuário encontrado.
        </div>

      </div>

    </div>

  </div>
</template>
```
