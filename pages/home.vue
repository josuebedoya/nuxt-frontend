<template>
  <!-- H1 -->
  <section class="bg-quaternary py-5">
    <div class="container mx-auto">
        <h1 class="text-center text-18 tracking-[1.8px] uppercase"> {{textH1}} </h1>
    </div>
  </section>
  <!-- Form Vehiculo -->
  <section>

  </section>
  <!-- List Categorias -->
  <section class="container mx-auto py-10">
        <div class="text-center">
            <div class="text-secondary text-[16px] lg:text-[20px] font-bold uppercase mb-0 ">{{titlesCart.subtitle}}</div>
            <div class="text-primary text-[30px] lg:text-[45px] font-semibold mb-5 ">{{titlesCart.title}}</div>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 px-3">
            <div v-for="i in 8" :key="i" class="mb-5">
                <IMedia
                    alt="Persona conduciendo"
                    :base-src="cart[0].img"
                    ratio="4/3"
                    rounded="rounded-xl"
                />
                <div class="text-center text-primary text-[16px] lg:text-[20px] font-semibold mt-4">{{ cart[0].name  }}</div>
                <div class="text-center text-secondary text-[14px] lg:text-[16px] uppercase">{{ cart[0].category  }}</div>
            </div>
        </div>
  </section>
  <!-- Info -->
  <section class="relative py-15">
  <div class="absolute inset-0 lg:inset-y-0 lg:left-0 lg:w-1/3 bg-secondary rounded-e-2xl"></div>
  <div class="relative max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row justify-end items-center gap-20 lg:gap-50">
    <!-- Image column -->
    <div class="w-full lg:w-2/5 lg:-mr-[140px]">
      <IMedia
            alt="Persona conduciendo"
            :base-src="infoRent.img"
            :ratio="ratioMedia"
            width="w-full"
            rounded="rounded-2xl"
            class="shadow-lg"
          />
    </div>
    <!-- Text column -->
    <div class="w-full lg:w-1/2 space-y-6">
      <p class="text-white lg:text-secondary text-[16px] lg:text-[20px] font-bold uppercase mb-0 text-center lg:text-left">
        {{infoRent.summary}}
      </p>
      <h2 class="text-white lg:text-primary text-[30px] lg:text-[45px] font-semibold mb-5 text-center lg:text-left">
        {{infoRent.title}}
      </h2>
      <div class="space-y-2 text-white lg:text-dark-3 text-[16px] lg:text-[20px] text-justify" v-html="infoRent.customHtml"></div>
      <div class="text-center lg:text-left">
        <UButton :label="infoRent.caption" 
                :to="infoRent.url" 
                class="bg-white lg:bg-secondary text-secondary lg:text-white hover:bg-primary hover:text-white px-6 py-4 rounded-lg transition text-[18px] font-semibold leading-[20px]">
        </UButton>
      </div>
    </div>
  </div>
</section>
  <!-- Form Contacto -->
  <section class="mt-15" :style="bgStyle">
<div class="h-[500px]"></div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { textH1, cart, titlesCart, infoRent, useBreakpoints } from '~/composables/useConfig'

definePageMeta({
  layout: 'master'
})

const { isLg } = useBreakpoints()

const bgStyle = computed(() => ({
  background: isLg.value
    ? 'linear-gradient(360deg, var(--color-dark-1) 50%,  var(--color-gray-1) 50%)'
    : 'var(--color-dark-1)'
}))

const ratioMedia = computed(() => isLg.value ? '4/5' : '16/9')

useHead(() => ({
  title: 'Home',
  meta: [
    {
      name: 'Home',
      content: 'Home',
    },
  ],
}))
</script>

<style scoped>

</style>