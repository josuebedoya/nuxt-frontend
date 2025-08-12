<script setup lang="ts">
  import type { PageData } from '#ipage/types/pages'
  defineProps<{ page: PageData }>()
</script>

<template>
  <div>
    <h1>Page ID {{page.id}} --> {{ page.title }}</h1>
    <div>{{ page }}</div>
  </div>
</template>
