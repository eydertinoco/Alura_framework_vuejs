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
  <h1 class="centralizado" v-text="titulo"/>

  <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="filtre por parte do título"/>

  <ul class="lista-fotos">
    <li class="lista-fotos-item" v-for="foto in fotosComFiltro">

      <meu-painel :titulo="foto.titulo">

        <imagem-responsiva :url="foto.url" :titulo="foto.titulo"/>

      </meu-painel>

    </li>
  </ul>

</div>
</template>

<script>
import ImagemResponsiva from './components/shared/imagem-responsiva/imagemResponsiva.vue';
import Painel from './components/shared/panel/Painel.vue'

export default {

  components: {

    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva
  },

  data () {
    return {
      titulo: 'Alurapic', 
      fotos: [],
      filtro: ''
    }
  },

  computed: {
    
    fotosComFiltro() {
      if(this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },

  created() {

    this.$http
      .get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err));
  }
}
</script>

<style lang="scss">
  .corpo {
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  }

  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos-item {
    display: inline-block;
  }

  .filtro {
    display: block;
    width: 100%;
  }
</style>
