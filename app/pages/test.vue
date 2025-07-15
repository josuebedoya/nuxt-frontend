<template>
  <div class="container m-auto py-5">
    <h1 class="text-center font-bold text-lg">Componente IMedia</h1>
    <div class="my-5 grid gap-4 grid-cols-3">
      <IMedia
        base-src="https://dev-surtiplate.ozonohosting.com/assets/media/general/inicio/slider-1_extraLargeThumb.webp"
        overlay-hide-on-hover 
        alt="Ejemplo"
        object="contain"
        overlay-gradient="linear-gradient(to right, rgba(0,0,0,0.6), transparent)" />


      <IMedia
        base-src="https://dev-surtiplate.ozonohosting.com/assets/media/general/inicio/slider-1_extraLargeThumb.webp"
        hover-src="https://dev-surtiplate.ozonohosting.com/assets/media/general/productos/img-2_extraLargeThumb.webp"
        alt="Ejemplo" 
        ratio="8/3" 
        overlay-gradient="linear-gradient(230deg, #CDDC39, transparent)"/>

      <IMedia
        base-src="https://dev-surtiplate.ozonohosting.com/assets/media/general/inicio/slider-1_extraLargeThumb.webp"
        hover-src="https://dev-surtiplate.ozonohosting.com/assets/media/general/productos/img-2_extraLargeThumb.webp"
        ratio="4/5">
        <template #overlay>
          <IText />
        </template>
      </IMedia>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  // permission: ['auth'],
})
</script>
