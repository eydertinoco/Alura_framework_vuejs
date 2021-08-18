<template>
<div>
  <h1>{{ titulo }}</h1>
  <h1 v-text="titulo"/>
  <ul>
    <li>
      <img v-bind:src="foto.url" v-bind:alt="foto.titulo">
    </li>
    <li>
      <img :src="foto.url" :alt="foto.titulo">
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      titulo: "Alurapic",
      foto: {
        url: 'https://www.petz.com.br/blog/wp-content/uploads/2021/03/piercing-para-cachorro-2.jpg',
        titulo: 'cachorro'
      }
    }
  }
}
</script>

<style lang="scss">

</style>
