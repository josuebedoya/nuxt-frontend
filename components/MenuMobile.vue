<script setup>
import { ref, computed } from 'vue'
import { DialogTitle, DialogDescription, VisuallyHidden } from 'reka-ui'

const props = defineProps({
  menuItems: { type: Array, default: () => ([]) },
  menuClass: { type: String, default: 'w-full justify-center'},
  menuOrientation: { type: String, default: 'vertical' },
  menuVariant: { type: String, default: 'link' }, // link o pill
  menuUI: { type: Object, default: () => ({})  },
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
  drawerHeaderImage: { type: String, default: '' },
  drawerUI: { type: Object, default: () => ({})  },
  // Props del items
  iconFont: { type: String, default: '' },  // icon fijo Nivel 1
  iconFont1: { type: String, default: '' }, // icon fijo Nivel 2
  iconFont2: { type: String, default: '' }, // icon fijo Nivel 3            
})

// estado interno
const showDrawer = ref(false)
const isAvatar = computed(() => {
  return props.toggleAvatar
    ? { avatar: { src: props.toggleAvatar } }
    : {}
})


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

// Open drawer
const toggleDrawer = () => { showDrawer.value = !showDrawer.value }


</script>

<style scoped></style>

<template>
  <div>
    <UButton
      @click="toggleDrawer"
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
      :dismissible="drawerDismissible"
      :handle="drawerHandle"
      :direction="drawerDirection"
      :class="drawerClass"
      :overlay="drawerOverlay"
      :ui="drawerUI"
    >
      <template #header>
        <VisuallyHidden>
          <DialogTitle id="drawer-title">Menú de Navegación</DialogTitle>
        </VisuallyHidden>

        <VisuallyHidden>
          <DialogDescription id="drawer-desc">
            Aquí encontrarás los enlaces principales de la aplicación.
          </DialogDescription>
        </VisuallyHidden>
        <IMedia
          v-if="drawerHeaderImage"
          :base-src="drawerHeaderImage"
          alt="Logo"
          width="w-[181px]"
          height="h-[50px]"
          object="contain"
          class="mx-auto mb-4"
        />
        <UButton
          color="neutral"
          class="absolute right-2 top-2"
          variant="ghost"
          icon="i-lucide-x"
          @click="toggleDrawer"
        />
      </template>

      <template #body>
        <UNavigationMenu
          :items="navigationItems"
          :orientation="menuOrientation"
          :class="menuClass"
          :variant="menuVariant"
          :ui="menuUI"
        />
      </template>
    </UDrawer>



  </div>
</template>

