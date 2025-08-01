<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import {useWindowSize} from "@vueuse/core";
import Thumbs from './partials/thumbs.vue'
import CsTailwind from "~/utils/csTalwind"
import Dots from "./partials/dots.vue";
import Navs from "./partials/navs.vue";

interface classApi {
 rootClass?: string | string[] | Record<string, boolean>
 containerClass?: string | string[] | Record<string, boolean>
 viewportClass?: string | string[] | Record<string, boolean>
}

interface configSlider {
 autoPlay?: boolean
 autoScroll?: boolean
 fade?: boolean
 delay?: number
 speed?: number
 pauseOnHover?: boolean
 loop?: boolean
 isVertical?: boolean
 reverse?: boolean
 centeredItems?: boolean
 itemsByTransition?: number
 moveWithWheel?: boolean
 dragFree?: boolean
}

interface configThumbs {
 thumbsProps: Record<string, any>,
 positionThumbs: string
 moveThumbsOnHover: boolean,

}

interface configSlide {
 classItem: string,
 classItemActive: string,
 paddingItems: string,
}

interface sliderProps {
 activeContainer: boolean,
 sizeContainer: string,
 isActive?: boolean
 component: never
 componentThumb: never
 items: Array<never>
 class?: Record<string, classApi>
 autoDimensioned: boolean
 breakPoint: Record<string | number, string | number>
 config: Record<string, configSlider>
 withNavs: boolean
 withDots: boolean
 navsConfig: Record<string, any>
 dotsConfig: Record<string, any>
 withThumbs: boolean
 thumbsConfig: Record<string, configThumbs>
 item: Record<string, configSlide>
}

const props = defineProps({
 isActive: {type: Boolean, default: true},
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
 withNavs: {type: Boolean, default: true},
 withDots: {type: Boolean, default: true},
 navsConfig: {type: Object, default: {}},
 dotsConfig: {type: Object, default: {}},

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
const scrollSnaps = ref([]);
const selectedIndex = ref(0);
const canScrollNext = ref(false);
const canScrollPrev = ref(false);
provide('activeThumbs', activeIndexes) // This to share state active with thumbs
provide('selectedIndex', selectedIndex) // This to share state active Dot
provide('canScrollNext', canScrollNext) // This to share scroll possibility with navs
provide('canScrollPrev', canScrollPrev) // This to share scroll possibility with navs
const {width} = useWindowSize();
const isMobile = computed(() => width.value <= 768);

// Update item ref
const setItemRef = (el: HTMLElement | null): any => {
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
  selectedIndex.value = emblaApi.selectedScrollSnap() || 0
  canScrollNext.value = emblaApi?.canScrollNext() || false;
  canScrollPrev.value = emblaApi?.canScrollPrev() || false;
 })
 emblaApi.on("init", onInit)
 emblaApi.on("init", () => {
  canScrollNext.value = emblaApi?.canScrollNext() || false;
  canScrollPrev.value = emblaApi?.canScrollPrev() || false;
 })
}

// Go to select item
function select(index: number): any {
 const slideGroupIndex = Math.floor(index / props.itemsByTransition)

 carouselRef.value?.emblaApi?.scrollTo(slideGroupIndex)
 onSelect(slideGroupIndex * props.itemsByTransition)
}

function scrollTo(index: Number): any {
 const emblaApi = carouselRef.value?.emblaApi
 if (!emblaApi) return
 emblaApi.scrollTo(index);
}

function scrollPrev(): any {
 const emblaApi = carouselRef.value?.emblaApi
 if (!emblaApi) return
 emblaApi.scrollPrev();
}

function scrollNext(): any {
 const emblaApi = carouselRef.value?.emblaApi
 if (!emblaApi) return
 emblaApi.scrollNext();
}

function onInit(api: any) {
 scrollSnaps.value = api?.scrollSnapList() || [];
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
 const emblaApi = carouselRef.value?.emblaApi
 const itemsInView = emblaApi?.slidesInView();
 const container = viewport?.childNodes[0] ?? null
 const measurements = itemRefs.value.map(el => (isVertical ? el?.offsetHeight : el?.offsetWidth))
 const largerSize = Math.max(...measurements ?? [])
 const size = (largerSize + 2) * (typeof numItems === 'number' ? numItems : (itemsInView.length === 0 ? 1 : itemsInView.length))
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
// Primary Slider
const primaryCarouselClass = computed(() => {
 const isVertical = props.isVertical
 const autoDimensioned = props.autoDimensionedViewport
 return [
  'root max-w-screen grid items-center grid-col-12',
  ((isIndividualNavs.value && !autoDimensioned) && (!isVertical && !verticalNavs.value)) && 'md:grid-cols-[max-content_1fr_max-content]',
  (((isIndividualNavs.value && autoDimensioned) || isVertical) && !verticalNavs.value) && 'md:grid-cols-[max-content_max-content_max-content] place-content-center'
 ].filter(Boolean)
})
// Root carousel
const rootClass = computed(() => ['slide-content', props.rootClass].filter(Boolean))
// Viewport carousel
const viewportClass = computed(() => {
 return [
  'm-auto viewport',
  props.isVertical ? 'max-w-max' : 'max-h-max',
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
  CsTailwind(props.breakPoint || {}, 'basis-1/').join(' '),
  'slide !m-0 !p-0'
 ].filter(Boolean)
})

const navsPosition = computed(() => props.navsConfig?.position)
const dotsPosition = computed(() => props.dotsConfig?.position)
const verticalNavs = computed(() => navsPosition.value === 'vertical')
const isIndividualNavs = computed(() => navsPosition.value === 'sides' || navsPosition.value === 'vertical')

const topNavs = computed(() => navsPosition.value?.startsWith('top'))
const bottomNavs = computed(() => navsPosition.value?.startsWith('bottom') || (isIndividualNavs.value && isMobile.value))


const propsNavs = computed(() => ({
 scrollNext,
 scrollPrev,
 navClass: [...[props.navsConfig?.navClass], verticalNavs.value && 'rotate-90'].filter(Boolean),
 ...props.navsConfig,
}))
const propsDots = computed(() => ({
 scrollTo,
 dots: scrollSnaps.value,
 vertical: (dotsPosition.value === 'right' || dotsPosition.value === 'left') && !isMobile.value,
 ...props.dotsConfig
}))

onMounted(async () => {
 await nextTick()

 // Use embla Controller
 emblaController()

 // Dimensioned container
 dimensionContainer()
});
</script>
<template>
 <section class="w-full h-auto block">
  <div :class="[classContainer, 'overflow-x-hidden']">
   <div :class="[`carousel`, {'vertical': isVertical}]">
    <div class="primary-carousel">
     <!--Controls-->
     <Navs v-if="withNavs && topNavs" v-bind="propsNavs"/>
     <!--Controls End-->

     <!-- Main Carousel -->
     <div :class="primaryCarouselClass">
      <!--Nav Prev -->
      <div v-if="withNavs && (isIndividualNavs && ( !isMobile || verticalNavs))"
           class="shrink-0">
       <Navs v-bind="propsNavs" :hidden-next="true"/>
      </div>

      <div class="min-w-0 overflow-hidden max-[768px]:col-span-full"
           :class="[
             {'md:grid md:grid-cols-[1fr_max-content] items-center': dotsPosition === 'right'},
             {'md:grid md:grid-cols-[max-content_1fr] items-center': dotsPosition === 'left'},
             ]">

       <!--Dots-->
       <div v-if="withDots && (dotsPosition === 'top'|| dotsPosition === 'left')" class="shrink-0">
        <Dots v-bind="propsDots"/>
       </div>

       <!--Carousel -->
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

         :arrows="false"
         :dots="false"
         :ui="{
            root: rootClass,
            viewport:viewportClass,
            container: containerCarouselClass,
            item: itemClass,
       }"

         :breakpoints="{
        768: {slidesToScroll: 2},
        500:{slidesToScroll: 1}
       }"
       >
        <div
          :ref="setItemRef"
          class="w-full min-w-0 max-w-full h-full"
          :class="paddingItems"
        >
         <component :componentItem="item" :is="component"/>

        </div>
       </UCarousel>

       <!--Dots-->
       <div v-if="withDots && (dotsPosition === 'bottom'|| dotsPosition === 'right')" class="shrink-0">
        <Dots v-bind="propsDots"/>
       </div>

      </div>

      <!--Nav Next -->
      <div v-if="withNavs && (isIndividualNavs &&( !isMobile || verticalNavs))"
           class="shrink-0">
       <Navs v-bind="propsNavs" :hidden-prev="true"/>
      </div>
     </div>
     <!-- Main Carousel  End-->

     <!--Controls-->
     <Navs v-if="withNavs && bottomNavs" v-bind="propsNavs"/>
     <!-- Controls End-->

    </div>
    <div v-if="withThumbs" class="thumbs-carousel my-4">
     <!-- Thumbs -->
     <Thumbs
       :items="items"
       :component="componentThumb"
       :select="select"
       :controls="{
              stop: () => stop(autoScroll ? 'autoScroll' : 'autoplay'),
              play: () => play(autoScroll ? 'autoScroll' : 'autoplay')
       }"
       :move-on-over="moveThumbsOnHover"
       :slider-config="thumbsProps"
     />
     <!-- Thumbs End -->
    </div>
   </div>
  </div>
 </section>
</template>
