<script setup>
import { ref } from 'vue'
import { logoColor, menuItemsRC } from '~/composables/useConfig'

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
          <IMenu
            :menu-items="menuItemsRC"
            :drawer-header-image="logoColor"
            toggle-icon="i-lucide:menu"
            class="flex space-x-6 items-center"
            item-class="text-primary text-[14px] hover:text-secondary hover:before:bg-transparent uppercase font-semibold" 
          />
        </div>

      </div>
    </div>
  </header>
</template>