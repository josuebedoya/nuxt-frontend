<script setup lang="ts">
import type {PageData} from '#ipage/types/pages'

defineProps<{ page: PageData }>()
</script>

<template>
  <div>
    <h1>Default Page ID {{ page.id }} --> {{ page.title }}</h1>
    <pre>{{ page }}</pre>
  </div>
</template>
