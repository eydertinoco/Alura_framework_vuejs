<!--
Para rodar o projeto:
D:\1. Eyder\2 - SISTEMAS DE INFORMAÇÃO\Alura\VUE.JS\1. Alura_framework_vuejs>  npm run dev

Para rodar a API:
D:\1. Eyder\2 - SISTEMAS DE INFORMAÇÃO\Alura\VUE.JS\1. Alura_framework_vuejs\api\api>npm start
> alurapic@1.0.0 start D:\1. Eyder\2 - SISTEMAS DE INFORMAÇÃO\Alura\VUE.JS\1. Alura_framework_vuejs\api\api
> node server.js
API escutando na porta: 3000
http://localhost:3000/v1/fotos
-->
<template>
<div class="corpo">

  <meu-menu :rotas="routes"/>

  <transition name="pagina">

    <router-view></router-view>

  </transition>

</div>
</template>

<script>

import { routes } from './routes';
import Menu from './components/shared/menu/Menu.vue'

export default {

  components: {
    'meu-menu' : Menu
  },

  data() {
    return {
      routes: routes
    }

  }

}
</script>

<style lang="scss">
  .corpo {
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  }

  .pagina-enter, .pagina-leave-active {
    opacity: 0;
  }

  .ppagina-enter-active, .pagina-leave-active {
    transition: opacity .4s;
  }

</style>
