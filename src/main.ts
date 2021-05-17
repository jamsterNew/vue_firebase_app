import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/index'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './vee-validate'
import Toasted from 'vue-toasted'

// import { firestorePlugin } from 'vuefire'
// Vue.use(firestorePlugin)
Vue.use(Buefy)
Vue.config.productionTip = false
Vue.use(Toasted)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
