<template>
  <div>
    <h1>
      Welcome to the home page
      <div class="grid grid-cols-4 gap-4">
        <div v-for="(item, key) in items" :key="key">
          <ItemComponent />
          <!-- <div>{{ item }}</div> -->
        </div>
      </div>

      <ClientOnly>
        <b v-if="authStore.isAuthenticated"
          >[{{ authStore.user?.firstName || "-" }}]</b
        >
      </ClientOnly>
    </h1>
    <UButton
      block
      color="neutral"
      variant="soft"
      label="Logout"
      @click="authStore.logout"
    />
  </div>
</template>

<script setup>
const authStore = useIuserAuthStore();
const items = {
  item1: {},
  item2: {},
  item3: {},
  item4: {},
  item5: {},
  item6: {},
  item7: {},
  item8: {},
};
</script>
