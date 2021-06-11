
import { createApp } from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
// import Vue from 'vue'
// import Vuelidate from 'vuelidate'
// Vue.use(Vuelidate)
createApp(App).mount('#app')
createApp(App).use(Vuelidate)
