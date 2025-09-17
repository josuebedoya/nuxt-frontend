<template>
 <slider
   :items="itemsSlider"
   :break-point="{
     0: 'basis-full'
    }" }
   :with-navs="false"
   :with-dots="true"
   :dotsConfig="{
    position: 'top',
    inContent: true,

   }"
   :config="{
      autoScroll: true,
      speed: 3000,
      pauseOnHover: true,
      reverse: false,
      isVertical: false
    }"
   :item="{
     padding: 'p-0'
    }"
   :classes="{
      item: 'basis-full w-full h-full'
  }">
  <template #default="{ item }">
   <div
     class="relative w-full h-full flex items-center justify-center aspect-[100/26]"
     :style="`background-image: url('${item.img}'); background-size: cover; background-position: center;`"
   >
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    <h2 class="relative z-10 text-white text-2xl font-bold text-center w-full px-4">
     {{ item.title }}
    </h2>
   </div>
  </template>
 </slider>
</template>
<script setup>
import Slider from '~/components/ISlider/Slider.vue'

let itemsSlider = [
 {
  title: 'Descubre nuevos destinos al volante, con Rent Cars siempre a tu lado',
  img: '/assets/media/home/slider-home.jpg'
 },
 {
  title: 'Descubre nuevos destinos al volante, con Rent Cars siempre a tu lado',
  img: '/assets/media/home/slider-home.jpg'
 },
 {
  title: 'Descubre nuevos destinos al volante, con Rent Cars siempre a tu lado',
  img: '/assets/media/home/slider-home.jpg'
 },
 {
  title: 'Descubre nuevos destinos al volante, con Rent Cars siempre a tu lado',
  img: '/assets/media/home/slider-home.jpg'
 }
]
</script>
