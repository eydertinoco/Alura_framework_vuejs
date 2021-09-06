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

  <nav>
    <ul>       
      <li v-for="route in routes">
        <router-link :to="route.path ? route.path : '/'">
          {{ route.titulo }}
        </router-link>
      </li>
    </ul>
  </nav>

  <router-view></router-view>

</div>
</template>

<script>

import { routes } from './routes';

export default {

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

</style>
