<template>
  <div>
    <h1>
      Welcome to the home page
      <ClientOnly>
        <b v-if="authStore.isAuthenticated">[{{ authStore.user?.firstName || '-' }}]</b>
      </ClientOnly>
    </h1>
    <UButton block color="neutral" variant="soft" label="Logout" @click="authStore.logout"/>
  </div>
</template>

<script setup>
const authStore = useIuserAuthStore()
</script>
