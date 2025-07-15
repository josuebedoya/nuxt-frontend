<template>
  <figure
    class="relative group overflow-hidden rounded-xl"
    :style="{ aspectRatio: ratio }"
  >
    <!-- Imagen base (si no hay hover) -->
    <img
      v-if="!hoverSrc"
      :src="baseSrc"
      :alt="alt"
      class="absolute inset-0 w-full h-full z-0"
      :class="'object-' + object"
    />

    <!-- Imagen base y hover  -->
    <template v-else>
      <img
        :src="baseSrc"
        :alt="alt"
        class="absolute inset-0 w-full h-full z-0 transition-opacity duration-500 opacity-100 group-hover:opacity-0"
        :class="'object-' + object"
      />
      <img
        :src="hoverSrc"
        :alt="alt + ' hover'"
        class="absolute inset-0 w-full h-full z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
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
      class="absolute inset-0 z-20 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
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
  overlayHideOnHover: {
    type: Boolean,
    default: false
  }
})

</script>
