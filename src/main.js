import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router'; //npm install --save vue-router
import { routes } from './routes';
import './directives/Transfrom';
import VeeValidate from 'vee-validate'; //npm install vee-validate@2.0.0-beta.18 --save
import msg from './pt_BR';
import 'bootstrap/dist/css/bootstrap.css'; //npm install bootstrap@3.3.7 --save
//Para não dar erro é necessário usar o css-loader e style-loader
//npm install css-loader@0.25.0 style-loader@0.13.1 --save-dev
//E é necessário adicionar a regra no webpack.condig.js
//{ test: /\.css$/, loader: 'style-loader!css-loader' }
//Agora é necessário instalar o loader referente a URL:
//npm install url-loader@0.5.7 --save-dev
//Para usar o SASS:
//npm install node-sass@4.5.0 sass-loader@4.1.1 --save-dev
//AVISO: Só consegui instalar o node-sass com npm install node-sass
//No style adicone: <style scoped lang="scss">
import './assets/css/teste.css';
import './assets/js/teste.js';
import 'jquery/dist/jquery.js'; //npm install jquery@3.1.1 --save
//Necessário adicionar o plugin no webpack.config.js
//plugins: [new webpack.ProvidePlugin({$: 'jquery/dist/jquery.js', jQuery: 'jquery/dist/jquery.js'})]
import 'bootstrap/dist/js/bootstrap.js'; //Depende do jQuery


//Gerar os arquivos para distribuir nossa aplicação
//npm run build
//Pasta dist criada

//Servidor Local para ler a aplicação da build
//
//Passar a pasta dist e arquivo index.html 

Vue.use(VueResource);
//Vue.http.options.root = 'http://localhost:3000';
Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';
//npm run dev considera http://localhost:3000. 
//npm run build considera o endereço em API_URL.

Vue.http.interceptors.push((req, next) => {

  // é possível colocar informações no header antes do envio da requisição
  req.headers.set('Authorization', 'informação de segurança aqui');
  console.log('Lidando com o request');

  next(res => {
    console.log('Lidando com a resposta')
    // é possível acessar os dados da reposta e realizar transformações antes
    console.log(res.body);
  });

});

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
