<template>
  <section class="relative py-10 lg:py-15 xl:py-24">
    <div class="absolute inset-0 lg:inset-y-0 lg:left-0 lg:w-1/4 bg-secondary rounded-e-2xl"></div>
    <div
      class="relative container mx-auto px-4 flex flex-col-reverse lg:flex-row justify-between items-center gap-20 lg:gap-50">
      <!-- Image column -->
      <div class="w-full lg:w-2/5 lg:-mr-[140px] flex justify-center items-center">
        <IMedia
          alt="Persona conduciendo"
          :base-src="infoRent.img"
          :ratio="ratioMedia"
          width="w-full max-w-[500px]"
          rounded="rounded-xl lg:rounded-4xl"
          class="shadow-lg"
        />
      </div>
      <!-- Text column -->
      <div class="w-full lg:w-1/2 space-y-6">
        <p
          class="text-white lg:text-info text-[16px] lg:text-[20px] font-bold uppercase mb-0 text-center lg:text-left">
          {{ infoRent.summary }}
        </p>
        <h2 class="text-white lg:text-info text-[30px] lg:text-[45px] font-semibold mb-5 text-center lg:text-left">
          {{ infoRent.title }}
        </h2>
        <div class="space-y-2 text-white lg:text-info text-[16px] lg:text-[20px] text-justify"
             v-html="infoRent.customHtml"></div>
        <div class="text-center lg:text-left">
          <UButton :label="infoRent.caption"
                   :to="infoRent.url"
                   class="px-6 py-4 rounded-lg transition font-semibold"
                   :class="buttonClass">
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
// import {infoRent, useBreakpoints} from "~/composables/useConfig";
import {computed} from "vue";

const {isLg} = useBreakpoints()
const ratioMedia = computed(() => isLg.value ? '4/5' : '16/18')

const buttonClass = computed(() => [
  'bg-white lg:bg-secondary hover:bg-secondary lg:hover:bg-white',
  'text-primary lg:text-white hover:text-white lg:hover:text-primary text-[18px] leading-[20px]',
  'border border-transparent hover:border-white lg:hover:border-primary'
])
</script>
