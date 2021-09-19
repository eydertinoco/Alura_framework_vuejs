import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router'; //npm install --save vue-router
import { routes } from './routes';
import './directives/Transfrom';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({ 
  routes: routes 
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
