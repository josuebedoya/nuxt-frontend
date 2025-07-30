<script setup>
import { ref, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

const props = defineProps({
  menuTitle: { type: String, required: true },
  menuItems: { type: Array, default: () => [] },
  mobileBreakpoint: { type: String, default: 'lg' },
  toggleText: { type: String, default: '' },
  headerImage: { type: String, default: '' },
})

const showDrawer = ref(false)
const { width } = useWindowSize()
const bpMap = { sm: 640, md: 768, lg: 1024, xl: 1280 }
const isMobile = computed(() => width.value < (bpMap[props.mobileBreakpoint] || bpMap.lg))


const navigationItems = computed(() =>
  props.menuItems.map(item => ({
    label: item.title,
    to: item.url,
    children: item.children?.map(child => ({
      label: child.title,
      to: child.url,
      children: child.children?.map(sub => ({ label: sub.title, to: sub.url }))
    }))
  }))
)
</script>

<style scoped>

</style>

<template>
  <div class="flex items-center">
    <!-- Si es Movil -->
    <div v-if="isMobile" class="relative">
      <!-- Toggle Button -->
      <UButton
        @click="showDrawer = !showDrawer"
        variant="outline"
        color="neutral"
        size="sm"
      >
        {{ toggleText || menuTitle }}
      </UButton>

      <UDrawer direction="left" inset v-model:open="showDrawer">

      <template #content>
        <div class="p-4 w-50 sm:w-full">
        <UNavigationMenu
          :items="navigationItems"
          orientation="vertical"
        />
      </div>
      </template>
    </UDrawer>


    </div>

    <!-- Desktop menu -->
    <div v-else class="flex-1 flex justify-center">
      <UNavigationMenu
        :items="navigationItems"
        orientation="horizontal"
        class="w-full justify-center"
      />
    </div>
  </div>
</template>

