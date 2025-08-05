<script setup>
const props = defineProps({
  menuItems: { type: Array, default: () => ([]) },
  menuClass: { type: String, default: 'w-full justify-center'},
  menuOrientation: { type: String, default: 'horizontal' },
  menuVariant: { type: String, default: 'link' }, // link o pill
    // Props del items
  iconFont: { type: String, default: '' },                  // icon fijo Nivel 1
  iconFont1: { type: String, default: '' },                 // icon fijo Nivel 2
  iconFont2: { type: String, default: '' },                 // icon fijo Nivel 3                                        
  // estilos a partir del 2 nivel
  menuUI: { type: Object, default: () => ({})  },
})

/* 
  https://ui.nuxt.com/components/navigation-menu#theme
*/

const navigationItems = computed(() =>
  props.menuItems.map(item => ({
    label: item.title,
    icon: item.icon || props.iconFont,
    to: item.url,
    children: item.children?.map(child => ({
      label: child.title,
      to: child.url,
      icon: item.icon || props.iconFont1 ,
      children: child.children?.map(sub => ({ 
        label: sub.title, 
        to: sub.url,
        icon: item.icon || props.iconFont2,
      }))
    }))
  }))
)
</script>
<style scoped></style>
<template>
  <UNavigationMenu  :items="navigationItems" 
                    :orientation="menuOrientation" 
                    :class="menuClass" 
                    :variant="menuVariant"
                    :ui="menuUI"
  />
</template>

