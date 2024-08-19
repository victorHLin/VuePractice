import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/bootstrap/scss/bootstrap.scss'

const app = createApp(App)

app.use(router)

app.mount('#app')
