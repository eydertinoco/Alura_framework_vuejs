<template>
<div>
  <h1 class="centralizado" v-text="titulo"/>

  <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="filtre por parte do título"/>

  <ul class="lista-fotos">
    <li class="lista-fotos-item" v-for="foto in fotosComFiltro">

      <meu-painel :titulo="foto.titulo">

        <imagem-responsiva v-meu-transfrom="{ incremento: 90, animate: true }" :url="foto.url" :titulo="foto.titulo"/>

        <!--@click.native="remove(foto)"-->
        <meu-botao tipo="button" rotulo="REMOVER" 
        @botaoAtivado="remove(foto)" 
        v-bind:confirmacao="true" 
        estilo="perigo">
        </meu-botao>


      </meu-painel>

    </li>
  </ul>

</div>
</template>

<script>
import ImagemResponsiva from '../shared/imagem-responsiva/imagemResponsiva.vue';
import Painel from '../shared/panel/Painel.vue';
import Botao from '../shared/botao/Botao.vue';

export default {

  components: {

    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao' : Botao
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

  methods: {

    remove(foto) {
      alert('Foto ' + foto.titulo + ' foi removida.')
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
