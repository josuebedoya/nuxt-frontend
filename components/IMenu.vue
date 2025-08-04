<script setup>
import { ref, computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'

const props = defineProps({
  menuItems: { type: Array, default: () => [] },
  menuClass: { type: String, default: 'w-full justify-center'},
  menuOrientation: { type: String, default: 'horizontal' },
  breakpoint: { type: String, default: '1024px' },
  onlyMobile: { type: Boolean, default: false },
  onlyDesktop: { type: Boolean, default: false },
  showResponsiveMenu:{ type: Boolean, default: true },
  toggleText: { type: String, default: '' },
  toggleIcon: { type: String, default: '' },
  toggleTrailing: { type: Boolean, default: true },
  toggleVariant: { type: String, default: 'outline' },
  toggleSize: { type: String, default: 'sm' },
  toggleAvatar: { type: String, default: '' },
  toggleClass: { type: String, default: '' },
  drawerDirection: { type: String, default: 'left' },
  drawerHandle: { type: Boolean, default: false },
  drawerDismissible: { type: Boolean, default: true },
  drawerOverlay: { type: Boolean, default: true },
  drawerClass: { type: String, default: 'w-96 md:w-1/3' },
  drawerHeader: { type: String, default: 'border-b border-gray-100' },
  drawerContent: { type: String, default: '' },
  drawerHeaderImage: { type: String, default: '' },
  // Props del items
  iconFont: { type: String, default: '' },                  // icon fijo Nivel 1
  iconFont1: { type: String, default: '' },                 // icon fijo Nivel 2
  iconFont2: { type: String, default: '' },                 // icon fijo Nivel 3
  itemClass: { type: String, default: '' },                 
  itemHoverClass: { type: String, default: '' },            
  iconClass: { type: String, default: '' },                 
  iconHoverClass: { type: String, default: '' },            
  textDecoration: { type: String, default: 'no-underline' } 
})

// estado interno
const showDrawer = ref(false)
const isDesktop  = useMediaQuery(`(min-width: ${props.breakpoint})`)
const showMobileMenu = computed(() =>
  props.onlyMobile || 
  (props.showResponsiveMenu && !props.onlyDesktop && !isDesktop.value)
)

const showDesktopMenu = computed(() =>
  props.onlyDesktop ||
  (props.showResponsiveMenu && !props.onlyMobile && isDesktop.value)
)
const isAvatar = computed(() => {
  return props.toggleAvatar
    ? { avatar: { src: props.toggleAvatar } }
    : {}
})
const drawerUI = computed(() => {
  const out = {}
  if (props.drawerHeader) out.header = props.drawerHeader
  if (props.drawerContent) out.content = props.drawerContent
  return out
})

drawerUI
const navigationItems = computed(() =>
  props.menuItems.map(item => ({
    label: item.title,
    icon: item.icon ?? props.iconFont,
    to: item.url,
    class: props.itemClass,
    activeClass: props.itemHoverClass,
    iconClass: props.iconClass,
    iconActiveClass: props.iconHoverClass,
    iconHoverClass: props.iconHoverClass,
    textDecoration: props.textDecoration,
    children: item.children?.map(child => ({
      label: child.title,
      to: child.url,
      icon: item.icon ?? props.iconFont1 ?? props.iconFont,
      class: props.itemClass,
      activeClass: props.itemHoverClass,
      iconClass: props.iconClass,
      iconActiveClass: props.iconHoverClass,
      iconHoverClass: props.iconHoverClass,
      textDecoration: props.textDecoration,
      children: child.children?.map(sub => ({ 
        label: sub.title, 
        to: sub.url,
        icon: item.icon ?? props.iconFont2 ?? props.iconFont,
        class: props.itemClass,
        activeClass: props.itemHoverClass,
        iconClass: props.iconClass,
        iconActiveClass: props.iconHoverClass,
        iconHoverClass: props.iconHoverClass,
        textDecoration: props.textDecoration,
      
      }))
    }))
  }))
)

// Open drawer
const toggleDrawer = () => { showDrawer.value = !showDrawer.value }

</script>

<style scoped></style>

<template>
  <div>
    <!-- Menu Mobile -->
    <div v-if="showMobileMenu">
        <UButton
          @click="toggleDrawer()"
          :variant="toggleVariant"
          :size="toggleSize"
          :icon="toggleIcon"
          :class="toggleClass"
          :trailing="toggleTrailing"
          v-bind="isAvatar"
        >
          {{ toggleText }}
        </UButton>
        <UDrawer
            v-model:open="showDrawer"
            :dismissible="true"
            :handle="false" 
            :direction="drawerDirection"
            :class="drawerClass"
            :overlay="drawerOverlay"
            :ui="drawerUI"

          >
      
          <template #header>
            <IMedia
            v-if="drawerHeaderImage"
            :base-src="drawerHeaderImage"
            alt="Logo"
            width="w-[181px]"
            height="h-[50px]"
            object="contain"
            class="mx-auto mb-4"
          />
            <UButton color="neutral" class="absolute right-2 top-2" variant="ghost" icon="i-lucide-x"  @click="toggleDrawer()" />
          </template>

          <template #body>
            <UNavigationMenu :items="navigationItems" orientation="vertical" />
          </template>
        </UDrawer>
    </div>
    <!-- Menu Desktop -->
    <div v-if="showDesktopMenu">
      <UNavigationMenu :items="navigationItems" :orientation="menuOrientation" :class="menuClass" />
    </div>

  </div>
</template>