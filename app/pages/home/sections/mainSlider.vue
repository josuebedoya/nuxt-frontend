<template>
  <slider
    :items="itemsSlider"
    :config="{
      autoScroll: true,
      speed: 3000,
      pauseOnHover: true,
      reverse: false,
      isVertical: false
    }"
    :classes="{
      item: 'basis-full w-full h-full'
  }">
    <template #default>
      <div class="relative w-full h-[300px] lg:h-[500px]">
        <div
          v-for="(item, index) in itemsSlider"
          :key="index"
          class="absolute inset-0 transition-opacity duration-500 ease-in-out"
          :class="{ 'opacity-100': index === 0, 'opacity-0': index !== 0 }"
        >
          <img
            :src="item.img"
            alt="Slider Image"
            class="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
            <h2 class="text-white"/>
          </div>
        </div>
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
