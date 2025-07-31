<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import Thumbs from './partials/thumbs.vue'
import CsTailwind from "~/utils/csTalwind"

const props = defineProps({
 isActive: {type: Boolean, default: true},
 id: {type: String, default: ""},
 component: {type: null, required: true},
 componentThumb: {type: null, required: false},
 items: {type: Array, required: true},
 rootClass: {type: String, default: ""},
 containerClass: {type: String, default: ""},
 viewportClass: {type: String, default: ""},
 autoDimensionedViewport: {type: Boolean, default: false},
 breakPoint: {type: Object, required: false, default: {0: 1, "md": 2, "lg": 3, "xl": 4}},

 // BEHAVIOR CAROUSEL
 autoPlay: {type: Boolean, default: true},
 autoScroll: {type: Boolean, default: false},
 fade: {type: Boolean, default: false},
 delay: {type: Number, default: 3000},
 speed: {type: Number, default: 1},
 pauseOnHover: {type: Boolean, default: false},
 loop: {type: Boolean, default: false},
 isVertical: {type: Boolean, default: false},
 reverse: {type: Boolean, default: false},
 centeredItems: {type: Boolean, default: false},
 itemsByTransition: {type: Number, default: 1},
 moveWithWheel: {type: Boolean, default: false},
 dragFree: {type: Boolean, default: false},

 // CONTAINER
 activeContainer: {type: Boolean, default: false},
 sizeContainer: {type: String, default: '2xl:container'},

 //NAVS & DOTS
 withDots: {type: Boolean, default: true},
 withNavs: {type: Boolean, default: true},
 colorNavs: {type: String, default: "primary"},
 sizeNavs: {type: String, default: "md"},
 variantNavs: {type: String, default: "ghost"},
 navPrevIcon: {type: String, default: "material-symbols:arrow-back-ios-new"},
 navNextIcon: {type: String, default: "material-symbols:arrow-forward-ios-rounded"},
 navPrevLabel: {type: String, default: ""},
 navNextLabel: {type: String, default: ""},
 controlsClass: {type: String, default: ""},
 classNavs: {type: String, default: ""},
 classDots: {type: String, default: ""},
 navPosition: {type: String, default: 'bottom-center'},
 navsPadding: {type: String, default: 'sm'},

 // THUMBS
 withThumbs: {type: Boolean, default: false},
 thumbsProps: {type: Object, default: {}},
 positionThumbs: {type: String, default: "left"},
 moveThumbsOnHover: {type: Boolean, default: false},


 // ITEM
 classItem: {type: String, default: ""},
 classItemActive: {type: String, default: ""},
 paddingItems: {type: String, default: "p-4"},
})

const carouselRef = ref(null)
const itemRefs = ref<HTMLElement[]>([])
const activeIndexes = ref([])
const thumbsVertical = ref(props.thumbsProps?.isVertical);
provide('activeThumbs', activeIndexes) // This to share state active with thumbs
const breakpointClass = computed(() => CsTailwind(props.breakPoint || {}, 'basis-1/').join(' '))

const navVerticals = computed(() => (props.navPosition === 'verticals') && props.isVertical)
const positionsNavs: Record<string, string> = {
 'top-left': 'justify-start',
 'bottom-left': 'justify-start',
 'top-center': 'justify-center',
 'bottom-center': 'justify-center',
 'top-between': 'justify-between',
 'bottom-between': 'justify-between',
 'top-right': 'justify-end',
 'bottom-right': 'justify-end',
 'sides': 'justify-between items-center absolute -translate-y-1/2 top-1/2',
 'verticals': navVerticals.value ? 'justify-between absolute flex-col inset-0' : 'justify-center'
}
const sizes = computed<Record<string, string>>(() => {
 const isVertical = navVerticals.value
 return {
  sm: isVertical ? 'my-8' : 'w-[94%]',
  md: isVertical ? 'my-10' : 'w-[93%]',
  lg: isVertical ? 'my-12' : 'w-[91%]',
  xl: isVertical ? 'my-16' : 'w-[90%]'
 }
})
const positionsIndividualNavs = computed<Record<string, string[]>>(() => {
 const isVertical = navVerticals.value
 return {
  sm: isVertical ? ['!-top-10', '!-bottom-10'] : ['!-start-12', '!-end-12'],
  md: isVertical ? ['!-top-12', '!-bottom-12'] : ['!-start-14', '!-end-14'],
  lg: isVertical ? ['!-top-14', '!-bottom-14'] : ['!-start-16', '!-end-16'],
  xl: isVertical ? ['!-top-18', '!-bottom-18'] : ['!-start-18', '!-end-18']
 }
})
const positionPrev = computed(() => positionsIndividualNavs.value[props.navsPadding]?.[0] || '')
const positionNext = computed(() => positionsIndividualNavs.value[props.navsPadding]?.[1] || '')

// Update item ref
const setItemRef = (el: HTMLElement | null) => {
 if (el && !itemRefs.value.includes(el)) {
  itemRefs.value.push(el)
 }
}

// Controller Section Active
function emblaController(): any {
 const emblaApi = carouselRef.value?.emblaApi
 if (!emblaApi) return

 emblaApi.on('select', () => {
  requestAnimationFrame(() => {
   const index = emblaApi.selectedScrollSnap() * props.itemsByTransition
   onSelect(index)
  })
 })
}

// Go to select item
function select(index: number): any {
 const slideGroupIndex = Math.floor(index / props.itemsByTransition)

 carouselRef.value?.emblaApi?.scrollTo(slideGroupIndex)
 onSelect(slideGroupIndex * props.itemsByTransition)
}

// Fix select item
function onSelect(index: number): any {
 const total = props.items.length
 const indexes: number[] = []

 for (let i = 0; i < props.itemsByTransition; i++) {
  const current = index + i
  indexes.push(props.loop ? current % total : current)
 }

 activeIndexes.value = indexes
}

// Stop Animation
function stop(method: string = 'autoplay'): any {
 const pluginMethod = carouselRef.value?.emblaApi?.plugins()?.[method]

 if (pluginMethod) pluginMethod.stop()
}

// Play Animation
function play(method: string = 'autoplay'): any {
 const pluginMethod = carouselRef.value?.emblaApi?.plugins()?.[method]

 if (pluginMethod) pluginMethod.play()
}

// Dimensions container
function dimensionContainer(): any {
 const isVertical = props.isVertical
 const numItems = Object.values(props.breakPoint).slice(-1)[0];
 const viewport = carouselRef.value?.emblaRef
 const container = viewport?.childNodes[0] ?? null
 const measurements = itemRefs.value.map(el => (isVertical ? el?.offsetHeight : el?.offsetWidth))
 const largerSize = Math.max(...measurements ?? [])
 const size = (largerSize + 2) * numItems

 if ((viewport && container) && (props.autoDimensionedViewport || isVertical)) {
  if (isVertical) {
   viewport.style.maxHeight = `${size}px`
   container.style.maxHeight = `${size}px`
  } else {
   viewport.style.maxWidth = `${size}px`
   container.style.maxWidth = `${size}px`
  }
 }
}

/* Classes Component */

// Container
const classContainer = computed(() => {
 return props.activeContainer && [props.sizeContainer, 'mx-auto'].filter(Boolean)
})
// Carousel
const carouselClass = computed(() => {
 return [`carousel${props.id}`,
  'flex gap-8 w-full items-center',
  thumbsVertical.value ? 'flex-row justify-between' : 'flex-col justify-center',
  (props.isVertical && thumbsVertical.value) && 'max-w-max mx-auto'
 ].filter(Boolean)
})
// Primary Slider
const primaryCarouselClass = computed(() => {
 return [
  'primary-carousel',
  (props.withThumbs && thumbsVertical.value) && 'w-[90%]',
  thumbsVertical.value ? 'flex-row justify-between' : 'flex-col justify-center',
  props.isVertical || props.autoDimensionedViewport ? 'max-w-max' : 'max-w-full'
 ].filter(Boolean)
})
// Root carousel
const rootClass = computed(() => {
 const navSides = props.navPosition === 'sides'
 const isVertical = props.isVertical
 const verticalNavs = navVerticals.value
 return [
  'slide-content m-auto',
  (props.withThumbs && thumbsVertical.value) && 'max-w-[95%]',
  !props.autoDimensionedViewport ? 'w-full' : 'w-auto',
  props.navPosition?.startsWith('top') && 'flex flex-col-reverse',
  (verticalNavs || navSides) ? sizes.value[props.navsPadding] || 'my-10 w-[90%]' : 'w-full',
  props.rootClass
 ].filter(Boolean)
})
// Viewport carousel
const viewportClass = computed(() => {
 return [
  'm-auto viewport',
  props.isVertical ? 'max-w-max' : 'max-h-max',
  thumbsVertical.value ? 'flex-row justify-between' : 'flex-col justify-center',
  props.viewportClass
 ].filter(Boolean)
})
// container carousel
const containerCarouselClass = computed(() => {
 return [
  props.isVertical ? '!items-center ui-v-container' : '!items-start ui-h-container',
  'slide-container justify-start !m-0',
  props.containerClass
 ].filter(Boolean)
})
// items
const itemClass = computed(() => {
 return [
  props.isVertical ? '!items-center ui-v-container' : '!items-start ui-h-container',
  props.classItem,
  breakpointClass.value,
  'slide !m-0 !p-0'
 ].filter(Boolean)
})
// Arrows
const arrowsClass = computed(() => {
 return [
  'navs flex w-full h-full',
  positionsNavs[props.navPosition] || 'justify-center'
 ].filter(Boolean)
})
// prev arrow
const prevArrowClass = computed(() => {
 const navSides = props.navPosition === 'sides'
 const verticalNavs = navVerticals.value
 return [
  'cursor-pointer  max-w-max max-h-max !relative',
  !navVerticals.value && '!top-0 !rotate-0 translate-y-0',
  positionsIndividualNavs.value[props.navsPadding]?.[0] || '!-top-10 !-start-12',
  (!navSides && !verticalNavs) && '!-start-0 !left-auto !translate-x-0',
  (navSides && navSides) && '!right-auto left-0 !translate-x-0 ',
  navSides && '!top-0 !translate-y-[1%]',
  props.classNavs
 ].filter(Boolean)
})
// next arrow
const nextArrowClass = computed(() => {
 const navSides = props.navPosition === 'sides'
 const isVertical = props.isVertical
 const verticalNavs = navVerticals.value
 return [
  'cursor-pointer  max-w-max max-h-max !relative flex flex-row-reverse',
  !navVerticals.value && '!top-0 !rotate-0 translate-y-0',
  positionsIndividualNavs.value[props.navsPadding]?.[1] || '!-bottom-10 !-end-12',
  (!navSides && !verticalNavs) && '!-end-0 !left-auto !translate-x-0',
  (isVertical && navSides) && '!left-auto right-0 !translate-x-0',
  navSides && '!top-0 !translate-y-[1%]',
  props.classNavs
 ].filter(Boolean)
})

onMounted(async () => {
 await nextTick()

 // Use embla Controller
 emblaController()

 // Dimensioned container
 dimensionContainer()
});

</script>
<template>
 <section :id="id" class="w-full h-auto block">
  <div :class="classContainer">
   <div :class="carouselClass">
    <!-- Main Carousel -->
    <div :class="primaryCarouselClass">
     <UCarousel
       :active="isActive"
       ref="carouselRef"
       @select="onSelect"
       :items="items"
       v-slot="{ item }"
       :class-names="{snapped: '', inView: ['active', ...classItemActive.split(' ')]}"
       :loop="loop || reverse"
       :orientation="isVertical ? 'vertical' : 'horizontal'"
       :dragFree="dragFree"
       :wheelGestures="isVertical && moveWithWheel"
       :align="centeredItems ? 'center' : 'start'"
       :slidesToScroll="itemsByTransition"
       :inViewThreshold="0.6"

       :auto-scroll="autoScroll ? {
         direction: reverse ? 'backward' : 'forward',
         stopOnMouseEnter: pauseOnHover,
         stopOnInteraction: !pauseOnHover,
         isPlaying: pauseOnHover,
         speed: speed
       } : false"
       :autoplay="autoPlay &&  !autoScroll ? {
         direction: reverse ? 'backward' : 'forward',
         delay,
         stopOnMouseEnter: pauseOnHover,
         stopOnInteraction: !pauseOnHover,
         jump: false
       } : false"
       :fade="fade"

       :arrows="withNavs"
       :prev="{
         label: navPrevLabel,
         color: colorNavs,
         size: sizeNavs,
         variant: variantNavs,
         onClick:emblaController
       }"
       :next="{
         label: navNextLabel,
         color: colorNavs,
         size: sizeNavs,
         variant: variantNavs,
         onClick:emblaController
       }"
       :prev-icon="navPrevIcon.trim()"
       :next-icon="navNextIcon.trim()"
       :dots="withDots"

       :ui="{
            root: rootClass,
            viewport:viewportClass,
            container: containerCarouselClass,
            item: itemClass,
            controls: `controls ${controlsClass}`,
            dots: 'dots !static my-3',
            dot: `dot ${classDots}`,
            arrows:arrowsClass,
            prev: prevArrowClass,
            next: nextArrowClass
       }"

       :breakpoints="{
        768: {slidesToScroll: 2},
        500:{slidesToScroll: 1}
       }"
     >
      <div
        :ref="setItemRef"
        class="w-full h-full"
        :class="paddingItems"
      >
       <component :componentItem="item" :is="component"/>

      </div>
     </UCarousel>
    </div>
    <!-- Main Carousel  End-->

    <!-- Thumbs -->
    <div
      v-if="withThumbs"
      :class="[
          'thumbs-carousel',
          thumbsVertical ? 'flex flex-col gap-2 max-w-[15%]' : 'w-full flex justify-center'
        ]"
    >
     <Thumbs
       :items="items"
       :component="componentThumb"
       :select="select"
       :controls="{
              stop: () => stop(autoScroll ? 'autoScroll' : 'autoplay'),
              play: () => play(autoScroll ? 'autoScroll' : 'autoplay')
       }"
       :move-on-over="moveThumbsOnHover"
       :thumbsProps="thumbsProps"
     />
    </div>
    <!-- Thumbs End -->
   </div>
  </div>
 </section>
</template>
