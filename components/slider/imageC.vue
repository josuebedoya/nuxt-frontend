<template>
  <img :src="componentItem?.image" :alt="componentItem?.image"
       class="w-16 h-16 rounded-md shadow-md"
  />
</template>

<script setup lang="ts">
defineProps<{
 componentItem: object,
  classImg?: string
}>();
</script>