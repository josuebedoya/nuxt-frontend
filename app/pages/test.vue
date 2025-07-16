<template>
  <div class="container m-auto py-5 bg-amber-50">
    <h1 class="text-center font-bold text-lg">Componente IMedia</h1>
    <div class="my-5 grid gap-4 grid-cols-1 sm:grid-cols-3">
      <IMedia 
        base-src="https://dev-burgertour.ozonohosting.com/assets/media/video11.mp4?u=1751481253"
        :isVideo="true"
        :videoAttrs="{ controls: true, autoplay: true, muted: true, loop: true, playsinline: true }"
        alt="Promo"
        ratio="4/5"
        width="w-full"
        rounded="rounded-xl"
      />

      <IMedia
        base-src="https://dev-surtiplate.ozonohosting.com/assets/media/general/inicio/slider-1_extraLargeThumb.webp"
        overlay-hide-on-hover 
        alt="Ejemplo"
        object="contain"
        width="w-full"
        ratio="auto" 
        height="h-80"
        rounded="rounded-2xl"
        overlay-gradient="linear-gradient(to right, rgba(0,0,0,0.6), transparent)" />


      <IMedia
        base-src="https://dev-surtiplate.ozonohosting.com/assets/media/general/inicio/slider-1_extraLargeThumb.webp"
        hover-src="https://dev-surtiplate.ozonohosting.com/assets/media/general/productos/img-2_extraLargeThumb.webp"
        alt="Ejemplo" 
        ratio="8/3" 
        class="shadow-2xl border border-gray-200"
        rounded="rounded-s-full"
        overlay-gradient="linear-gradient(230deg, #CDDC39, transparent)"/>

      <IMedia
        base-src="https://dev-surtiplate.ozonohosting.com/assets/media/general/inicio/slider-1_extraLargeThumb.webp"
        hover-src="https://dev-surtiplate.ozonohosting.com/assets/media/general/productos/img-2_extraLargeThumb.webp"
        ratio="4/5"
        rounded="rounded-e-lg"
        >
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
