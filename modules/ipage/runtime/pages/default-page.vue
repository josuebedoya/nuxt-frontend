<template>
  <div>
    <h1>{{ page.title }}</h1>
    <pre>{{page}}</pre>
  </div>
</template>

<script setup>
defineProps({
  page: Object
})
</script>
