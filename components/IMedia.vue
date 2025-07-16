<template>
  <figure
    class="relative group overflow-hidden"
    :class="[rounded, width, height, $attrs.class]"
    :style="{ aspectRatio: ratio }"
  >
    <!-- Media base (imagen o video si no hay hover) -->
    <template v-if="!hoverSrc">
      <!-- VIDEO -->
      <video
        v-if="isVideo"
        :src="baseSrc"
        v-bind="videoAttrs"
        class="absolute inset-0 w-full h-full z-0 rounded-inherit"
        :class="'object-' + object"
      ></video>

      <!-- IMAGEN -->
      <img
        v-else
        :src="baseSrc"
        :alt="alt"
        :fetchpriority="fetchpriority"
        class="absolute inset-0 w-full h-full z-0 rounded-inherit"
        :class="'object-' + object"
      />
    </template>

    <!-- Imagen base y hover  -->
    <template v-else>
      <img
        :src="baseSrc"
        :alt="alt"
        :fetchpriority="fetchpriority"
        class="absolute inset-0 w-full h-full z-0 transition-opacity duration-500 opacity-100 group-hover:opacity-0 rounded-inherit"
        :class="'object-' + object"
      />
      <img
        :src="hoverSrc"
        :alt="alt + ' hover'"
        :fetchpriority="fetchpriority"
        class="absolute inset-0 w-full h-full z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100 rounded-inherit"
        :class="'object-' + object"
      />
    </template>

    <!-- Gradiente base -->
    <div
      v-if="overlayGradient"
      class="absolute inset-0 z-20 transition-opacity duration-500"
      :class="overlayGradientHover || overlayHideOnHover ? 'opacity-100 group-hover:opacity-0' : 'opacity-100'"
      :style="{ background: overlayGradient }"
    ></div>

    <!-- Gradiente en hover si se define -->
    <div
      v-if="overlayGradientHover"
      class="absolute inset-0 z-20 transition-opacity duration-500 opacity-0 group-hover:opacity-100 "
      :style="{ background: overlayGradientHover }"
    ></div>

    <!-- Slot overlay -->
    <div v-if="$slots.overlay" class="absolute inset-0 z-30">
      <slot name="overlay" />
    </div>

  </figure>
</template>

<script setup>
const props = defineProps({
  baseSrc: { type: String, required: true },
  alt: { type: String, default: '' },
  hoverSrc: String,
  ratio: { type: String, default: '16/9' },
  object: { type: String, default: 'cover' },
  overlayGradient: String,
  overlayGradientHover: String,
  overlayHideOnHover: { type: Boolean, default: false },
  rounded: { type: String, default: 'rounded-none' },
  width: { type: String, default: 'w-full' },
  height: { type: String, default: 'h-auto' },
  isVideo: { type: Boolean, default: false },
  videoAttrs: { type: Object, default: () => ({}) },
  fetchpriority: { type: String, default: 'auto' } // puede ser: 'high', 'low' o 'auto'
})




</script>
