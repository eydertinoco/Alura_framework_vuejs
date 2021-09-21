import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router'; //npm install --save vue-router
import { routes } from './routes';
import './directives/Transfrom';
import VeeValidate from 'vee-validate'; //npm install vee-validate@2.0.0-beta.18 --save
import msg from './pt_BR';

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000';
Vue.use(VueRouter);

const router = new VueRouter({ 
  routes: routes 
});

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
