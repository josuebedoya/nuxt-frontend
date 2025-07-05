<template>
  <UContainer class="py-20 text-center">
    <UCard class="max-w-xl mx-auto">
      <template #header>
        <h1 class="text-4xl font-bold text-red-600">403</h1>
      </template>

      <p class="text-lg text-gray-700 mt-2">
        You don’t have permission to access this page.
      </p>

      <div class="mt-6 flex justify-center gap-4">
        <UButton icon="i-heroicons-home" color="primary" @click="goHome">
          Go to Homepage
        </UButton>
      </div>
    </UCard>
  </UContainer>
</template>

<script setup>
const router = useRouter()

function goBack() {
  router.back()
}

function goHome() {
  router.push('/')
}
</script>
