<script setup lang="ts">
  //Always use light for layout master
  const colorMode = useColorMode()
  colorMode.value = 'light'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
