<template>
  <img :src="item?.image" :alt="item?.image"
       class="w-16 h-16 rounded-md"
  />
</template>

<script setup lang="ts">
defineProps<{
  item: object,
  classImg?: string
}>();
</script>