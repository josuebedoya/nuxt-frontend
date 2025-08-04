<script setup>
import { computed } from 'vue'

const props = defineProps({
  baseSrc: { type: String, required: true },
  hoverSrc: { type: String, default: undefined },
  alt: { type: String, default: '' },
  ratio: { type: String, default: '16/9' },
  object: { type: String, default: 'cover' },
  overlayGradient: { type: String, default: undefined },
  overlayGradientHover: { type: String, default: undefined },
  overlayHideOnHover: { type: Boolean, default: false },
  rounded: { type: String, default: 'rounded-none' },
  width: { type: String, default: 'w-full' },
  height: { type: String, default: 'h-auto' },
  videoAttrs: { type: Object, default: () => ({ playsinline: true }) },
  fetchpriority: { type: String, default: 'auto' },
  linkHref: { type: String, default: undefined },
  target: { type: String, default: '_self' }
})

// Computed classes and styles
const figureClasses = computed(() => [
  'relative group overflow-hidden',
  props.rounded,
  props.width,
  props.height
])
const mediaClass = computed(() => `absolute inset-0 w-full h-full rounded-inherit object-${props.object}`)
const transitionClass = 'transition-opacity duration-300'
const aspectStyle = computed(() => ({ aspectRatio: props.ratio }))

// Para usar baseSrc para todo aqui veo si es video o imagen
const isYoutube = computed(() => /(?:youtu\.be\/|youtube\.com\/(?:watch|embed))/.test(props.baseSrc))
const isVideo = computed(() => props.baseSrc.match(/\.(mp4|webm|ogg)(\?.*)?$/i))
const isImage = computed(() => !isYoutube.value && !isVideo.value)

// Busca el id de youtube
const youtubeId = computed(() => {
  if (!isYoutube.value) return null
  try {
    const url = new URL(props.baseSrc)
    if (url.hostname.includes('youtu.be')) return url.pathname.slice(1)
    return url.searchParams.get('v') || url.pathname.split('/embed/')[1] || null
  } catch {
    return null
  }
})

// Para poner el enlace o sino que tenga div
const isNuxtLink = computed(() => props.linkHref?.startsWith('/') || props.linkHref?.startsWith('#'))
const linkComponent = computed(() => props.linkHref ? (isNuxtLink.value ? 'NuxtLink' : 'a') : 'div')
const linkAttrs = computed(() => {
  if (!props.linkHref) return {}
  return {
    ...(isNuxtLink.value ? { to: props.linkHref } : { href: props.linkHref, target: props.target, rel: 'noopener noreferrer' })
  }
})

// Overlay 
const overlayBaseClass = computed(() => props.overlayHideOnHover
  ? 'opacity-100 group-hover:opacity-0'
  : 'opacity-100'
)
</script>

<template>
  <figure :class="figureClasses" :style="aspectStyle">
    <!-- Clickable wrapper -->
    <component
      :is="linkComponent"
      v-bind="linkAttrs"
      class="absolute inset-0 z-0 rounded-inherit overflow-hidden no-underline"
    >
      <!-- Media selection -->
      <template v-if="isYoutube && youtubeId">
        <ClientOnly>
          <iframe
            :src="`https://www.youtube.com/embed/${youtubeId}?rel=0`"
            :title="alt"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            :style="aspectStyle"
            :class="mediaClass"
            aria-label="alt"
          ></iframe>
        </ClientOnly>
      </template>

      <template v-else-if="isVideo">
        <video
          :src="baseSrc"
          v-bind="videoAttrs"
          :class="mediaClass"
          playsinline
          aria-label="alt"
        ></video>
      </template>

      <template v-else>
        <picture class="w-full h-full contents">
          <source v-if="baseSrc.endsWith('.webp')"
                  :srcset="baseSrc"
                  type="image/webp" />
          <img
            :src="baseSrc"
            :alt="alt"
            loading="lazy"
            decoding="async"
            :fetchpriority="fetchpriority"
            :class="mediaClass"
          />
        </picture>
      </template>
    </component>

    <!-- Hover image -->
    <img
      v-if="hoverSrc && isImage"
      :src="hoverSrc"
      :alt="alt"
      loading="lazy"
      decoding="async"
      :fetchpriority="fetchpriority"
      :class="[mediaClass, 'z-10', transitionClass, 'opacity-0', 'group-hover:opacity-100']"
    />

    <!-- Overlay gradient -->
    <div
      v-if="overlayGradient"
      class="absolute inset-0 z-20 transition-opacity duration-300 pointer-events-none"
      :class="overlayBaseClass"
      :style="{ background: overlayGradient }"
      aria-hidden="true"
    ></div>

    <!-- Overlay gradient hover -->
    <div
      v-if="overlayGradientHover"
      class="absolute inset-0 z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
      :style="{ background: overlayGradientHover }"
      aria-hidden="true"
    ></div>

    <!-- Custom overlay slot -->
    <div v-if="$slots.overlay" class="absolute inset-0 z-30">
      <slot name="overlay" />
    </div>
  </figure>
</template>
