<script setup>
import { logoWhite, menuFooter } from '~/composables/useConfig'
</script>
<style scope>
.b-top {
    border-top: 1px solid rgba(44, 52, 63, 1);
}
</style>
<template>
  <footer class="bg-dark-1 text-white">
    <div class="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 py-12">
      
      <div class="flex justify-center md:justify-start self-center">
        <IMedia
          alt="Rent Cars"
          :base-src="logoWhite"
          width="w-[181px]"
          height="h-[50px]"
          object="contain"
          link-href="/"
        />
      </div>
      
      <div class="flex flex-col space-y-4">
        <h3 class="text-lg font-semibold">Info de Contacto</h3>
        <ul class="space-y-2">
          <li class="flex items-center space-x-2">
            <Icon name="mdi:whatsapp" class="w-5 h-5" />
            <span>(+57) 311 8060834</span>
          </li>
          <li class="flex items-center space-x-2">
            <Icon name="heroicons-outline:mail" class="w-5 h-5" />
            <span>serviciocliente@readyrentacars.com</span>
          </li>
          <li class="flex items-center space-x-2">
            <Icon name="heroicons-outline:map-pin" class="w-5 h-5" />
            <span>
              Calle 74 bis 83-45 · Aeropuerto El Dorado de Bogotá ·
              servicio Meet & Greet
            </span>
          </li>
        </ul>
      </div>
      
      <div class="flex flex-col space-y-4">
        <h3 class="text-lg font-semibold">Apoyo al Cliente</h3>
        <IMenu
            :menu-items="menuFooter"
            iconFont="heroicons-outline:chevron-right"
            menu-orientation="vertical"
            :only-desktop="true"
            icon-class="text-white text-[18px]"
            item-class="text-white text-[18px] hover:text-white hover:before:bg-transparent"                
          />
      </div>
      
    </div>
    <div class="bg-dark-2 b-top">
  <div class="container mx-auto flex flex-col items-center 
              md:flex-row md:justify-between md:items-center px-3">
    <p class="w-full md:w-auto py-4 text-center md:text-left">Logo</p>
    <p class="w-full md:w-auto py-4 text-[16px] font-normal text-center md:text-left">
      Ready Rent Cars. Todos los derechos reservados.
    </p>
  </div>
</div>
  </footer>
</template>