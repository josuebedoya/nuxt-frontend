<script setup>
import { ref } from 'vue'
import { logoColor, menuItemsRC } from '~/composables/useConfig'

//
const menuDesktopUI = ref({
  childList: 'grid grid-cols-1 gap-4 p-4',
  childLink: 'px-2',
  childLinkLabel: 'text-primary hover:text-primary text-[12px] font-semibold',
  viewport:  'w-48',
  linkLabel: 'text-primary hover:text-secondary text-[14px] uppercase font-semibold',
  linkLeadingIcon: 'text-primary hover:text-primary' 
})
const menuMobileUI = ref({
  linkLeadingIcon: 'hidden', 
  linkLabel: 'text-primary hover:text-secondary text-[14px] uppercase font-semibold',
})

</script>

<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="logo">
          <IMedia
            alt="Rent Cars"
            :base-src="logoColor"
            width="w-[144px]"
            height="h-[33px]"
            object="contain"
            link-href="/"
          />
        </div>

        <div class="menu">
          <ClientOnly>
            <MenuGeneral
            :menu-items="menuItemsRC"
            :drawerHeader-image="logoColor"
            toggleIcon="i-lucide:menu"
            :menueUIMobil="menuMobileUI"
            :menuUIDesktop="menuDesktopUI"
          />
          </ClientOnly>
        </div>

      </div>
    </div>
  </header>
</template>