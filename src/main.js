
import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
const app = createApp(App)
// app.component('my-form', {})
// const myForm = app.component('my-form')

// import Vuelidate from 'vuelidate'
// Vue.use(Vuelidate)

app.use(Vuelidate)
app.mount('#app')


// Vue.use(Vuelidate)
// createApp(App).mount('#app')

// vuelidate не работает, $v is not defined

