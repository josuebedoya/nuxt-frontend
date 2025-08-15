<template>
  <section class="bg-quaternary py-5 lg:py-10">
    <div class="container mx-auto">
      <Component-text
        :config-component-text="{
          typeTag: 'h1',
          classDinamic: 'text-center text-base lg:tex-lg xl:text-[22px] tracking-[1.8px] uppercase text-primary font-semibold',
          text: textH1,
        }"/>
    </div>
  </section>
</template>

<script setup lang="ts">
import {textH1} from "~/composables/useConfig";
import ComponentText from "~/components/ComponentText.vue";
</script>
