<!--
Ítem: elemento para mostrar la información de 1 elemento. Cuenta con ordenamiento por cada subelemento. con estos sub elementos:

imagen / galería / video (posiblemente el componente de imagen)

título -> style escrito tenga N tamaño , para mobil otro…

descripción

botón de acción

SubLabels (texto pequeño) posiblemente 3? [usuario, fecha, categoría] o sub Label opcionales sin restricción de cantidad
-->

<script lang="ts" setup>
import { button } from "#build/ui";

const data = {
  img: "https://dev-roomkaraoke.ozonohosting.com/assets/media/sedes/zona-rosa.jpg?u=1749163822",
  title: "Este es el titulo",
  labels: {
    resumen:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam officia consectetur aliquam tenetur officiis ratione eveniet, eaque consequuntur eius nemo optio dolore quasi blanditiis! Saepe excepturi illo at. Quasi, est?",
    description:
      "Eeaque consequuntur eius nemo optio dolore quasi blanditiis! Saepe excepturi illo at. Quasi, est? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam officia consectetur aliquam tenetur officiis ratione eveniet, ",
  },
  button: "Ver más",
};
</script>


<template>
  <section class="card-item">
    <!--component image-->

    <img :src="data.img" alt="" style="aspect-ratio: 1/1; height: 200px" />
    <div class="title">{{ data.title }}</div>
    <div v-for="(label, key) in data.labels" :key="key">
      <div class="{{ label }}">
        {{ label }}
      </div>
    </div>
    <UButton> {{ data.button }} </UButton>
  </section>
</template>





<style>
</style>
