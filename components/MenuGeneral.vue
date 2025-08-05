<script setup>
import { ref, computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import MenuMobile from '~/components/MenuMobile.vue'
import MenuDesktop from '~/components/MenuDesktop.vue'

// Props definitions
const props = defineProps({
  // Shared data
  menuItems:          { type: Array, required: true },
  breakpoint:         { type: String, default: '1024px' },
  showResponsiveMenu: { type: Boolean, default: true },

  // Mobile-specific styling props
  menuClassMobile:       { type: String, default: 'w-full justify-center' },
  menuOrientationMobile: { type: String, default: 'vertical' },
  menuVariantMobile:     { type: String, default: 'link' },
  menuUIMobile: { type: Object, default: () => ({})  },

  // Desktop-specific styling props
  menuClassDesktop:       { type: String, default: 'w-full justify-center' },
  menuOrientationDesktop: { type: String, default: 'horizontal' },
  menuVariantDesktop:     { type: String, default: 'link' },
  menuUIDesktop: { type: Object, default: () => ({})  },


  // Toggle & drawer props
  toggleText:        String,
  toggleIcon:        String,
  toggleVariant:     String,
  toggleSize:        String,
  toggleTrailing:    Boolean,
  toggleAvatar:      String,
  toggleClass:       String,
  drawerDirection:   String,
  drawerClass:       String,
  drawerOverlay:     Boolean,
  drawerHandle:      Boolean,
  drawerDismissible: Boolean,
  drawerHeaderImage: String,
  drawerUI:          Object,

  // Icons
  iconFont: String,
  iconFont1: String,
  iconFont2: String, 
})

// Internal state
const showDrawer = ref(false)
const isDesktop  = useMediaQuery(`(min-width: ${props.breakpoint})`)

// Responsive display logic
const showMobileMenu = computed(() =>
  props.showResponsiveMenu && !isDesktop.value
)
const showDesktopMenu = computed(() =>
  props.showResponsiveMenu && isDesktop.value
)


// Style props objects for v-bind
const mobileStyleProps = computed(() => ({
  menuClass:       props.menuClassMobile,
  menuOrientation: props.menuOrientationMobile,
  menuVariant:     props.menuVariantMobile,
  toggleText:     props.toggleText,
  toggleIcon:     props.toggleIcon,
  toggleVariant:  props.toggleVariant,
  toggleSize:     props.toggleSize,
  toggleTrailing: props.toggleTrailing,
  toggleAvatar:   props.toggleAvatar,
  toggleClass:    props.toggleClass,
  drawerDirection:    props.drawerDirection,
  drawerHandle:    props.drawerHandle,
  drawerDismissible:    props.drawerDismissible,
  drawerOverlay:    props.drawerOverlay,
  drawerClass:    props.drawerClass,
  drawerHeaderImage:    props.drawerHeaderImage,
  iconFont:    props.iconFont,
  iconFont1:    props.iconFont1,
  iconFont2:    props.iconFont2,
}))

const desktopStyleProps = computed(() => ({
  menuClass:       props.menuClassDesktop,
  menuOrientation: props.menuOrientationDesktop,
  menuVariant:     props.menuVariantDesktop,
  iconFont:    props.iconFont,
  iconFont1:    props.iconFont1,
  iconFont2:    props.iconFont2,
}))

// Drawer toggle
const toggleDrawer = () => { showDrawer.value = !showDrawer.value }
</script>

<style scoped></style>

<template>
  <div>
    <!-- Menu Mobile -->
    <MenuMobile
      v-if="showMobileMenu"
      :menuItems="menuItems"
      :show-drawer="showDrawer"
      :toggle-drawer="toggleDrawer"
      v-bind="mobileStyleProps"
      :menuUI="menuUIMobile"
      :drawerUI="drawerUI"
    />

    <!-- Menu Desktop -->
    <MenuDesktop
      v-if="showDesktopMenu"
      :menuItems="menuItems"
      :menuUI="menuUIDesktop"
      v-bind="desktopStyleProps"
    />
  </div>
</template>