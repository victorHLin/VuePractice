<template>
  <h1>Todo API</h1>
  <div>
    <h2>Sign Up</h2>
    <input type="email" placeholder="Email" v-model="signupField.email" />
    <input type="text" placeholder="Password" v-model="signupField.password" />
    <input type="text" placeholder="Nickname" v-model="signupField.nickname" />
    <br />
    <button type="button" @click="signup">Sign Up</button>
    <span v-if="signupErrMsg" style="color: red">{{ signupErrMsg }}</span>
    <!-- UID: {{ signupRes }} -->
  </div>

  <div>
    <h2>Log In</h2>
    <input type="email" placeholder="Email" v-model="signInField.email" />
    <input type="text" placeholder="Password" v-model="signInField.password" />
    <br />
    <button type="button" @click="signIn">Log In</button>
    <span v-if="signInErrMsg" style="color: red">{{ signInErrMsg }}</span>
    <!-- Token: {{ signInRes }} -->
  </div>

  <div>
    <h2>Validation</h2>
    <div v-if="user.uid">
      <p>UID: {{ user.uid }}</p>
      <p>Nickname: {{ user.nickname }}</p>
    </div>
    <div v-else>You haven't log in.</div>
  </div>

  <div>
    <h2>Sign out</h2>
    <button @click="signout">Sign out</button>
  </div>

  <hr />

  <div v-if="token">
    <h2>Todo list</h2>
    <div>
      <input type="text" placeholder="Add a Todo" v-model="newTodo" />
      <button type="button" @click="addTodo()" :disabled="!newTodo">Add</button>
    </div>
    <table>
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">createTime</th>
          <th scope="col">Todo</th>
          <th scope="col">status</th>
          <th scope="col">Delete</th>
          <th scope="col">Toggle</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in todos" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.createTime }}</td>
          <td>{{ item.content }}</td>
          <td>{{ item.status }}</td>
          <td>
            <button type="button" @click="deleteTodo(item.id)">Delete</button>
          </td>
          <td>
            <button type="button" @click="toggleStatus(item.id)">Toggle</button>
          </td>
          <td>
            <button @click="edit(index)" v-if="isEditing != index">Edit</button>

            <div v-else>
              <input :placeholder="item.content" v-model="tempTitle" />
              <button @click="confirm()" :disabled="!tempTitle">Confirm</button>
              <button @click="cancel()">Cancel</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// sign up
const signupField = ref({
  email: '',
  password: '',
  nickname: ''
})

const signupRes = ref('')
const signupErrMsg = ref('')

const api = 'https://todolist-api.hexschool.io'

const signup = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_up`, signupField.value)
    signupRes.value = res.data.uid
    signupErrMsg.value = ''
  } catch (err) {
    signupErrMsg.value = err.response.data.message
  }
}

//sign in
const signInField = ref({
  email: '',
  password: ''
})

const signInRes = ref('')
const signInErrMsg = ref('')

const signIn = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_in`, signInField.value)

    signInRes.value = res.data.token
    document.cookie = `customName=${res.data.token};`
    token.value = res.data.token
    signInErrMsg.value = ''
    validation()
  } catch (err) {
    signInErrMsg.value = err.response.data.message
    console.log(err.response.data.message)
  }
}

const user = ref({
  nickname: '',
  uid: ''
})

const token = ref('')

//validation
onMounted(async () => {
  const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)customName\s*=\s*([^;]*).*$)|^.*$/, '$1')
  token.value = cookie
  if (cookie) {
    validation()
  }
})

const validation = async () => {
  try {
    const res = await axios.get(`${api}/users/checkout`, {
      headers: {
        Authorization: token.value
      }
    })
    user.value = res.data
    getTodos()
  } catch (err) {
    // validation failed should logout the user
    console.log(err.response.data.message)
    signout()
  }
}

// signout
const signout = async () => {
  try {
    await axios.post(
      `${api}/users/sign_out`,
      {},
      {
        headers: {
          Authorization: token.value
        }
      }
    )
    token.value = ''
    document.cookie = `customName=;`
    user.value = {}
  } catch (err) {
    console.log(err.response.data.message)
  }
}

const todos = ref([])

// get todos
const getTodos = async () => {
  try {
    const response = await axios.get(`${api}/todos`, {
      headers: {
        Authorization: token.value
      }
    })
    todos.value = response.data.data
  } catch (err) {
    console.log(err.response.data.message)
  }
}

// add todo
const newTodo = ref('')

const addTodo = async () => {
  try {
    await axios.post(
      `${api}/todos`,
      { content: newTodo.value },
      {
        headers: {
          Authorization: token.value
        }
      }
    )
    getTodos()

    newTodo.value = ''
  } catch (err) {
    console.log(err.response.data.message)
  }
}

// update
const isEditing = ref(-1)
const tempTitle = ref('')
const edit = (index) => {
  isEditing.value = index
  tempTitle.value = todos.value[index].content
}

const confirm = async () => {
  try {
    await axios.put(
      `${api}/todos/${todos.value[isEditing.value].id}`,
      { content: tempTitle.value },
      {
        headers: {
          Authorization: token.value
        }
      }
    )

    getTodos()
    cancel()
  } catch (err) {
    console.log(err.response.data.message)
  }
}

const cancel = () => {
  tempTitle.value = ''
  isEditing.value = -1
}

// delete
const deleteTodo = async (id) => {
  try {
    await axios.delete(`${api}/todos/${id}`, {
      headers: {
        Authorization: token.value
      }
    })

    getTodos()
  } catch (err) {
    console.log(err.response.data.message)
  }
}

// patch toggle
const toggleStatus = async (id) => {
  try {
    await axios.patch(
      `${api}/todos/${id}/toggle`,
      {},
      {
        headers: {
          Authorization: token.value
        }
      }
    )

    getTodos()
  } catch (err) {
    console.log(err.response.data.message)
  }
}
</script>

<style></style>
