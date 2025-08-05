<script setup>
import { logoWhite, menuFooter, phone, address, email } from '~/composables/useConfig'

const menuUI = ref({
  linkLabel: 'text-white hover:text-sky-100 text-[18px] px-0',
})

</script>
<style scoped>
</style>
<template>
  <footer class="bg-dark-1 text-white">
    <div class="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 px-3">
      
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

         <ContactPhone :phones="phone"></ContactPhone>
         <ContactAddress :address="address"></ContactAddress>
         <ContactEmail :email="email"></ContactEmail>
      </div>
      
      <div class="flex flex-col space-y-4">
        <h3 class="text-lg font-semibold">Apoyo al Cliente</h3>
          <MenuDesktop
            :menuItems="menuFooter"
            iconFont="fa-solid:caret-right"
            menuOrientation="vertical"
            :menuUI="menuUI"  
          />
      </div>
      
    </div>
    <div class="bg-dark-2 border-t border-neutral-800">
  <div class="container mx-auto flex flex-col items-center 
              md:flex-row md:justify-between md:items-center px-3">
    <div class="w-full md:w-auto py-4 text-center md:text-left">
        <LogoImagina />
    </div>
    <p class="w-full md:w-auto py-4 text-[16px] font-normal text-center md:text-left">
        <Copyright />
    </p>
  </div>
</div>
  </footer>
</template>