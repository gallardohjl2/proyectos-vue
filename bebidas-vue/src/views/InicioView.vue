<script setup>
  import Receta from '../components/Receta.vue';
  import { useBebidasStore } from '../stores/bebidas'

  const bebidas = useBebidasStore()
</script>

<template>
  <h1 class="text-6xl font-extrabold">Recetas</h1>
  <p 
    v-if="bebidas.noRecetas"
    class="my-10 text-center text-2xl"
    > No hay Resultados, utiliza el formulario para buscar recetas</p>
  <div
   class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10"
   v-else
  >

    <Receta 
       v-for="receta in bebidas.recetas"
       :receta="receta"
       :key="receta.idDrink"
    />
  </div>
</template>