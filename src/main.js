// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import Vuetify from 'vuetify'
import Firebase from 'firebase'
import App from './App'
import router from './router'
import('../node_modules/vuetify/dist/vuetify.min.css')

const config = {
  databaseURL: 'https://kanban-rhd.firebaseio.com'
}
const firebase = Firebase.initializeApp(config)

Vue.use(VueFire)
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.prototype.$db = firebase.database()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
