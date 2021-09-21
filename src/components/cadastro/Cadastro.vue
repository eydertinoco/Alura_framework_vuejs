<template>
    <div>
        <h1 class="centralizado">Cadastro</h1>
        <h2 class="centralizado"> {{ foto.titulo }}</h2>

        <h2 v-if="foto_id" class="centralizado">Alterando</h2>
        <h2 v-else class="centralizado">Incluindo</h2>

        <form @submit.prevent="gravar()">
            <!--<div class="controle">
                <label for="titulo">TÍTULO</label>
                        @input="foto.titulo = $event.target.value" :value="foto.titulo"
                <input id="titulo" autocomplete="off" v-model="foto.titulo">
            <</div>-->

            <div class="controle">
                <label for="titulo">TÍTULO</label>
                <input name="titulo" v-model="foto.titulo" id="titulo" autocomplete="off" 
                v-validate data-vv-rules="required|min:3|max:30" data-vv-as="título">
                <span class="erro" v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span>
            </div>

            <div class="controle">
                <label for="url">URL</label>
                <input name="url" id="url" autocomplete="off" v-model="foto.url" 
                v-validate data-vv-rules="required"> <!--v-model.lazy foi removido por não ter suporte ao VueValidate-->
                <span class="erro"  v-show="errors.has('url')">{{ errors.first('url') }}</span>
                <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
            </div>

            <div class="controle">
                <label for="descricao">DESCRIÇÃO</label>
                <textarea id="descricao" autocomplete="off" v-model="foto.descricao"/>
            </div>

            <div class="centralizado">
                <meu-botao rotulo="GRAVAR" tipo="submit"/>
                <router-link :to="{ name: 'home' }"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
            </div>
        </form>
    </div>
</template>

<script>
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
import Foto from '../../domain/foto/Foto';
import FotoService from '../../domain/foto/FotoService';

export default {

  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },

  data() {
      return {
          foto: new Foto(),
          id: this.$route.params.id,
      }
  },

  methods: {
      gravar() {

          this.$validator
            .validateAll()
            .then(success => {
                if(success) {

                this.service
                    .cadastra(this.foto)
                    .then(() => {
                    if(this.id) this.$router.push({ name: 'home'});
                    this.foto = new Foto()
                    }, 
                    err => console.log(err));
                }
            });

          //this.service
          //.cadastra(this.foto)
          //.then(() => {
          //    if(this.id) this.$router.push({ name: 'home'})
          //    this.foto = new Foto();
          //  }, err => console.log(err));

          //this.resource
          //.save(this.foto)
          //.then(() => this.foto = new Foto(), err => console.log(err));

          //this.$http
          //.save('v1/fotos', this.foto)
          //.then(() => this.foto = new Foto(), err => console.log(err));
      }
  },

  created() {
      this.service = new FotoService(this.$resource);
      if (this.id) {
          this.service
          .busca(this.id)
          .then(foto => this.foto = foto);
      }
  }
}
</script>

<style scoped>
    .controle {
        font-size: 1.2em;
        margin-bottom: 20px;

    }
    .controle label {
        display: block;
        font-weight: bold;
    }

    .controle label + input, .controle textarea {
        width: 100%;
        font-size: inherit;
        border-radius: 5px
    }

    .centralizado {
        text-align: center;
    }

    .erro {
        color: red;
    }
</style>
