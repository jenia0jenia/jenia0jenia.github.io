import Vue from 'vue'
import '@/scss/style.scss'
import App from './App.vue'

Vue.config.productionTip = false


new Vue({
  el: '#app',
  render: h => h(App)
})
