<template>
  <!-- H1 -->
  <main-text/>
  <!-- Form Vehiculo -->
  <section>

  </section>
  <!-- List Categorias -->
  <section class="container mx-auto py-10">
    <div class="text-center">
      <div class="text-secondary text-[16px] lg:text-[20px] font-bold uppercase mb-0 ">{{ titlesCart.subtitle }}</div>
      <div class="text-primary text-[30px] lg:text-[45px] font-semibold mb-5 ">{{ titlesCart.title }}</div>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 px-3">
      <div v-for="i in 8" :key="i" class="mb-5">
        <IMedia
          alt="Persona conduciendo"
          :base-src="cart[0].img"
          ratio="4/3"
          rounded="rounded-xl"
        />
        <div class="text-center text-primary text-[16px] lg:text-[20px] font-semibold mt-4">{{ cart[ 0 ].name }}</div>
        <div class="text-center text-secondary text-[14px] lg:text-[16px] uppercase">{{ cart[ 0 ].category }}</div>
      </div>
    </div>
  </section>
  <!-- Info -->
  <info/>
  <!-- Form Contacto -->
  <section class="mt-15" :style="bgStyle">
    <div class="h-[500px]"></div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { textH1, cart, titlesCart, infoRent, useBreakpoints } from '~/composables/useConfig.js'
import MainText from "~/pages/home/sections/mainText.vue";
import Info from "~/pages/home/sections/info.vue";

definePageMeta( {
  layout: 'master'
} )

const { isLg } = useBreakpoints()
const bgStyle = computed( () => ( {
  background: isLg.value
    ? 'linear-gradient(360deg, var(--color-dark-1) 50%,  var(--color-gray-1) 50%)'
    : 'var(--color-dark-1)'
} ) )

useHead( () => ( {
  title: 'Home',
  meta: [
    {
      name: 'Home',
      content: 'Home',
    },
  ],
} ) )
</script>

<style scoped>

</style>
