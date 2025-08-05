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

/* Ejemplo de menuUi basico
const menuUI = {
  // segundo nivel: grid, paddings…
  childList: 'grid grid-cols-4 gap-6 p-6',
  // clases de cada enlace de nivel 2
  childLink: 'block px-2 py-1 text-gray-800 hover:text-primary',
  // ancho y estilos del panel dropdown
  viewport:  'w-80 bg-white rounded-lg shadow-lg'
}
  https://ui.nuxt.com/components/navigation-menu#theme

  linkLeadingAvatarSize – clases para el avatar que aparece antes del label (tamaño).
  linkLeadingAvatar – clases para el avatar que aparece antes del label.
  linkLeadingIcon – clases para el icono que aparece antes del label.
  linkLabel – clases para el texto (label) del enlace de primer nivel.
  linkLabelExternalIcon – clases para el icono “externo” que aparece al lado del label cuando target="_blank".
  linkTrailing – clases para el contenedor del “trailing” (icono de flecha o badge) de nivel 1.
  linkTrailingBadgeSize – clases para el tamaño del badge que aparece al final del enlace.
  linkTrailingBadge – clases para el badge que aparece al final del enlace.
  linkTrailingIcon – clases para el icono de “dropdown” o “external” que aparece al final del enlace de primer nivel.
  label – clases para cualquier etiqueta “tipo label” (items con type: 'label').
  link – clases para el propio <ULink> de primer nivel (tapable area).
  content – clases para el contenedor global del dropdown/mega-menú (útil para padding, bg, rounded, shadow, etc.).
  childList – clases para el contenedor (generalmente un <ul>) de los ítems de segundo nivel.
  childLabel – clases para etiquetas “tipo label” dentro de submenús.
  childItem – clases para cada elemento de lista (<li>) de segundo nivel.
  childLink – clases para el contenedor (<ULink>) de cada enlace de segundo nivel.
  childLinkIcon – clases para el icono que aparece dentro de cada enlace de segundo nivel.
  childLinkWrapper – clases para el wrapper interno del link de segundo nivel (entre <li> y <ULink>).
  childLinkLabel – clases para el texto del enlace de segundo nivel.
  childLinkLabelExternalIcon – clases para el icono “externo” en los enlaces de segundo nivel.
  childLinkDescription – clases para la descripción (prop description) que puede acompañar a cada enlace de segundo nivel. 
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

