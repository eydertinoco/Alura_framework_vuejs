<template>
<div>
  <h1 v-text="titulo"/>
  <ul>
    <li v-for="foto of fotos">
      <img :src="foto.url" :alt="foto.titulo">
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      titulo: "alura_animal",
      fotos: [
        {
          url: 'https://www.petz.com.br/blog/wp-content/uploads/2021/03/piercing-para-cachorro-2.jpg',
          titulo: 'animal_1'
        },
        {
          url: 'https://saude.abril.com.br/wp-content/uploads/2021/03/bichos-foto-vauvau-Getty-Images.png',
          titulo: 'animal_2'
        }
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
