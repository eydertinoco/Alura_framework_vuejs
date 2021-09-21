<template>
  <div>
    <h1 class="centralizado" v-text="titulo"/>

    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="filtre por parte do título"/>

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto in fotosComFiltro">

        <meu-painel :titulo="foto.titulo">

          <imagem-responsiva v-meu-transfrom:scale.animate="2" :url="foto.url" :titulo="foto.titulo"/>

          <!--@click.native="remove(foto)"-->
          <router-link :to="{ name: 'alterar', params: { id: foto._id } }">
            <meu-botao tipo="button" rotulo="ALTERAR"/>
          </router-link>
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
import FotoService from '../../domain/foto/FotoService';

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

      this.service.apaga(foto._id)
        .then(() => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1); //Vai remover foto do array;
          this.mensagem = 'Foto removida com sucesso.';
        }, err => {
          this.mensagem = err.message;
        });
    }
  },

  created() {

    this.service = new FotoService(this.$resource);

    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);{
        console.log(err);
        this.mensagem = 'Não foi possível obter as fotos, tente mais tarde.';
      });

    //this.resource = this.$resource('v1/fotos{/id}');
    //this.resource
    //  .query()
    //  .then(res => res.json())
    //  .then(fotos => this.fotos = fotos, err => console.log(err));

    //this.$http
    //  .get('v1/fotos')
    //  .then(res => res.json())
    //  .then(fotos => this.fotos = fotos, err => console.log(err));
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