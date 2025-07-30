<template>
  <div class=" py-5 bg-amber-50">
  <div class="container m-auto ">
    <h1 class="text-center font-bold text-lg mb-8">Componente IMedia</h1>
    <div class="my-5 grid gap-4 grid-cols-1 sm:grid-cols-3">
      <IMedia
        alt="Banner principal add"
        :base-src="imagen3"
        figcaption="Texto"
        ratio="16/9"
        link-href="/hola"
        rounded="rounded-full"
      />

      <IMedia
        :base-src="urlYoutube"
        ratio="16/9"
        rounded="rounded-xl"
      />
     
      <IMedia 
        :base-src="videoMP4"
        :video-attrs="{ controls: true, autoplay: true, muted: true, loop: true, playsinline: true }"
        alt="Promo"
        ratio="4/5"
        width="w-full"
        rounded="rounded-xl"
      />

      <IMedia
        :base-src="imagen1"
        overlay-hide-on-hover 
        alt="Ejemplo"
        object="contain"
        width="w-full"
        ratio="auto" 
        height="h-80"
        rounded="rounded-2xl"
        overlay-gradient="linear-gradient(to right, rgba(0,0,0,0.6), transparent)" />


      <IMedia
        :base-src="imagen2"
        :hover-src="imagen1"
        alt="Ejemplo" 
        ratio="8/3" 
        class="shadow-2xl border border-gray-200"
        rounded="rounded-s-full"
        overlay-gradient="linear-gradient(230deg, #CDDC39, transparent)"/>

      <IMedia
        :base-src="imagen1"
        :hover-src="imagen2"
        ratio="4/5"
        object="contain"
        rounded="rounded-xl"
        >
        <template #overlay>
          <IText />
        </template>
      </IMedia>  <!---->
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  // permission: ['auth'],
})

const imagen1 = ref('https://components.ozonohosting.com/assets/media/servicio-1.jpg?u=1700491876')
const imagen2 = ref('https://components.ozonohosting.com/assets/media/servicio-2.jpg?u=1700491876')
const imagen3 = ref('https://components.ozonohosting.com/assets/media/servicio-3.jpg?u=1700491876')
const videoMP4 = ref('https://components.ozonohosting.com/assets/media/video11.mp4?u=1753881983')
const urlYoutube = ref('https://www.youtube.com/watch?v=t2tB4D2craA')


// head dinámico
useHead(() => ({
  title: 'Test Media',
  meta: [
    {
      name: 'Test Media',
      content: 'Prueba con elementos Multimedia',
    },
  ],
}))
</script>
