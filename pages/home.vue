<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo a la izquierda -->
        <div class="logo">
          <IMedia
            alt="Rent Cars Logo"
            :base-src="logo"
            width="w-[144px]"
            height="h-[33px]"
            object="contain"
            link-href="/"
          />
        </div>

        <!-- ESPACIO flexible que centra el menú -->
        <div class="menu">
          <IMenu
            :menu-items="menuItemsRC"
            mobile-breakpoint="md" 
            :header-image="logo"
            toggle-text="Menu"
            header-bg="bg-primary"
            class="flex space-x-6 items-center"
          />
        </div>

      </div>
    </div>
  </nav>
  <div> </div>
</template>

<script setup>
import { ref } from 'vue'

const logo = ref('https://components.ozonohosting.com/assets/media/logo-8-horizontal-letra-roja-negra-ready-rent-cars.png?u=1753882751')

// Prueba de datos Menu
const menuItemsRC = ref([
    {
    title: 'Inicio',
    url: '/',
    children: []
  },
  {
    title: 'Vehículo',
    url: '/vehiculo',
    children: []
  },
  {
    title: 'Requisitos',
    url: '/requisitos',
    children: []
  },
    {
    title: 'Oficinas',
    url: '/oficinas',
    children: []
  },
    {
    title: 'Nosotros',
    url: '/Nosotros',
    children: []
  },
    {
    title: 'Contacto',
    url: '/contacto',
    children: []
  }
])

// Prueba de datos Menu
const menuItems = ref([
    {
    title: 'Hogar',
    url: '/categoria/hogar',
    icon: 'fa6-solid:tv',
    children: []
  },
  {
    title: 'Electrónica',
    url: '/categoria/electronica',
    icon: '',
    children: [
      {
        title: 'TVs',
        url: '/categoria/electronica/tvs',
        children: [
          { title: 'Smart TVs', url: '/categoria/electronica/tvs/smart' },
          { title: 'LED TVs',   url: '/categoria/electronica/tvs/led'   }
        ]
      },
      { title: 'Audio', url: '/categoria/electronica/audio' }
    ]
  },
  {
    title: 'Moda',
    url: '/categoria/moda',
    children: []
  }
])

useHead(() => ({
  title: 'Home',
  meta: [
    {
      name: 'Home',
      content: 'Home',
    },
  ],
}))
</script>

<style>
/* Obvia globos de comentarios y elementos superfluos */
</style>
