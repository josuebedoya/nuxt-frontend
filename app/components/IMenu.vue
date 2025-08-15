<script setup lang="ts">
  import type {NavigationMenuItem} from '@nuxt/ui'
  import {DialogTitle, DialogDescription} from 'reka-ui'

  const props = withDefaults(defineProps<{
    items: NavigationMenuItem[],
    drawerDirection?: 'left' | 'right'
  }>(), {
    drawerDirection: 'right'
  })

  const dOpen = ref(false)
</script>

<template>
  <UNavigationMenu :items="props.items" class="tw:hidden tw:md:flex"/>
  <UDrawer
    v-model:open="dOpen"
    class="tw:md:hidden" :direction="drawerDirection"
    should-scale-background :set-background-color-on-scale="false"
    :ui="{ content: 'tw:w-full', handle: 'tw:bg-gray-400!' }">

    <!-- Action Buton -->
    <UButton color="neutral" variant="ghost" trailing-icon="i-lucide-menu"/>

    <template #header>
      <div class="tw:flex tw:justify-between">
        <div>
          <DialogTitle>Site Name</DialogTitle>
          <DialogDescription>Menu</DialogDescription>
        </div>
        <UButton color="neutral" variant="ghost" icon="i-lucide-x" @click="dOpen = false"/>
      </div>
    </template>

    <template #body>
      <UNavigationMenu
        :items="props.items"
        orientation="vertical"
        :ui="{
          link: 'tw:w-full tw:justify-start tw:px-4 tw:py-2 tw:rounded-md hover:tw:bg-gray-100 dark:hover:tw:bg-gray-800',
          list: 'tw:flex-col tw:gap-1 tw:w-full'
        }"
      />
    </template>
  </UDrawer>
</template>
