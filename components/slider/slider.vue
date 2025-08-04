<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import {useWindowSize} from "@vueuse/core"
import type {sliderProps} from './partials/interfaces';
import Thumbs from './partials/thumbs.vue'
import CsTailwind from "~/utils/csTalwind"
import Dots from "./partials/dots.vue";
import Navs from "./partials/navs.vue";

const props = withDefaults(defineProps<sliderProps>(), {
 isActive: true,
 autoDimensioned: false,
 breakPoint: {0: 1, md: 2, lg: 3, xl: 4},
 class: {},
 config: {
  autoPlay: true,
  autoScroll: false,
  fade: false,
  delay: 2500,
  speed: 1,
  pauseOnHover: false,
  loop: false,
  isVertical: false,
  reverse: false,
  centeredItems: false,
  itemsByTransition: 1,
  moveWithWheel: false,
  dragFree: false,
  autoDimensioned: false
 },
 activeContainer: false,
 sizeContainer: '2xl:container',
 withNavs: true,
 withDots: true,
 navsConfig: {
  position: 'bottom-center'
 },
 dotsConfig: {
  position: 'bottom'
 },
 withThumbs: false,
 thumbsConfig: {
  sliderConfig: {},
  position: 'left',
  moveOnHover: false
 },
 item: {
  padding: 'p-4',
  classActive: ''
 },
})
const carouselRef = ref(null)
const sliderControls = useEmblaController(carouselRef, props)
const itemRefs = ref<HTMLElement[]>([])
provide('activeThumbs', sliderControls?.activeIndexes) // This to share state active with thumbs
provide('selectedIndex', sliderControls?.selectedIndex) // This to share state active Dot
provide('canScrollNext', sliderControls?.canScrollNext) // This to share scroll possibility with navs
provide('canScrollPrev', sliderControls?.canScrollPrev) // This to share scroll possibility with navs
const {width} = useWindowSize();
const isMobile = computed(() => width.value <= 768);

// Update item ref
const setItemRef = (el: HTMLElement | null): any => {
 if (el && !itemRefs.value.includes(el)) {
  itemRefs.value.push(el)
 }
}

// Dimensions container
function dimensionContainer(): any {
 const isVertical = props.config?.isVertical
 const numItems = Object.values(props.breakPoint).slice(-1)[0];
 const viewport = carouselRef.value?.emblaRef
 const emblaApi = carouselRef.value?.emblaApi
 const itemsInView = emblaApi?.slidesInView();
 const container = viewport?.childNodes[0] ?? null
 const measurements = itemRefs.value.map(el => (isVertical ? el?.offsetHeight : el?.offsetWidth))
 const largerSize = Math.max(...measurements ?? [])
 const size = (largerSize + 2) * (typeof numItems === 'number' ? numItems : (itemsInView.length === 0 ? 1 : itemsInView.length))
 if ((viewport && container) && (props.config?.autoDimensioned || isVertical)) {
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
const classContainer = computed(() => {
 return props.activeContainer && [props.sizeContainer, 'mx-auto'].filter(Boolean)
})
const primaryCarouselClass = computed(() => {
 const isVertical = props.config?.isVertical
 const autoDimensioned = props.config?.autoDimensioned
 return [
  'root max-w-screen grid items-center grid-col-12',
  ((isIndividualNavs.value && !autoDimensioned) && (!isVertical && !verticalNavs.value)) && 'md:grid-cols-[max-content_1fr_max-content]',
  (((isIndividualNavs.value && autoDimensioned) || isVertical) && !verticalNavs.value) && 'md:grid-cols-[max-content_max-content_max-content] place-content-center'
 ].filter(Boolean)
})
const rootClass = computed(() => ['slide-content', props.class?.root].filter(Boolean))
const viewportClass = computed(() => {
 return [
  'm-auto viewport',
  props.config?.isVertical ? 'max-w-max' : 'max-h-max',
  props.class?.viewport
 ].filter(Boolean)
})
const containerCarouselClass = computed(() => {
 return [
  props.config?.isVertical ? '!items-center ui-v-container' : '!items-start ui-h-container',
  'slide-container justify-start !m-0',
  props.class?.container
 ].filter(Boolean)
})
const itemClass = computed(() => {
 return [
  props.config?.isVertical ? '!items-center ui-v-container' : '!items-start ui-h-container',
  props.item?.class,
  CsTailwind(props.breakPoint || {}, 'basis-1/').join(' '),
  'slide !m-0 !p-0'
 ].filter(Boolean)
})

// Navs  && Dots
const navsPosition = computed(() => props.navsConfig?.position)
const dotsPosition = computed(() => props.dotsConfig?.position)
const verticalNavs = computed(() => navsPosition.value === 'vertical')
const isIndividualNavs = computed(() => navsPosition.value === 'sides' || navsPosition.value === 'vertical')
const topNavs = computed(() => navsPosition.value?.startsWith('top'))
const bottomNavs = computed(() => navsPosition.value?.startsWith('bottom') || (isIndividualNavs.value && isMobile.value))

const propsNavs = computed(() => ({
 scrollNext: sliderControls?.scrollNext,
 scrollPrev: sliderControls?.scrollPrev,
 navClass: [...[props.navsConfig?.navClass], verticalNavs.value && 'rotate-90'].filter(Boolean),
 ...props.navsConfig,
}))
const propsDots = computed(() => ({
 scrollTo: sliderControls?.scrollTo,
 dots: sliderControls?.scrollSnaps.value || [],
 vertical: (dotsPosition.value === 'right' || dotsPosition.value === 'left') && !isMobile.value,
 ...props.dotsConfig
}))

onMounted(async () => {
 await nextTick()
 // Use embla Controller
 sliderControls?.mainController()

 // Dimensioned container
 dimensionContainer()
});
</script>
<template>
 <section class="w-full h-auto block">
  <div :class="[classContainer, 'overflow-x-hidden']">
   <div :class="[`carousel`, {'vertical': config?.isVertical}]">
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
           :class="[{'md:grid md:grid-cols-[1fr_max-content] items-center': dotsPosition === 'right', 'md:grid md:grid-cols-[max-content_1fr] items-center': dotsPosition === 'left'}]"
      >

       <!--Dots-->
       <div v-if="withDots && (dotsPosition === 'top'|| dotsPosition === 'left')" class="shrink-0">
        <Dots v-bind="propsDots"/>
       </div>

       <!--Carousel -->
       <UCarousel
         :active="isActive"
         ref="carouselRef"
         :items="items"
         @select="sliderControls?.onSelect"
         v-slot="{ item, index }"
         v-bind="config"
         :class-names="{snapped: '', inView: ['active', ...props.item?.classActive.split(' ')]}"
         :loop="config?.loop || config?.reverse"
         :orientation="config?.isVertical ? 'vertical' : 'horizontal'"
         :wheelGestures="config?.isVertical &&config?. moveWithWheel"
         :align="config?.centeredItems ? 'center' : 'start'"
         :slidesToScroll="config?.itemsByTransition"
         :inViewThreshold="0.6"

         :auto-scroll="config?.autoScroll ? {
         direction: config?.reverse ? 'backward' : 'forward',
         stopOnMouseEnter: config?.pauseOnHover,
         stopOnInteraction: !config?.pauseOnHover,
         isPlaying: config?.pauseOnHover,
         speed: config?.speed
       } : false"
         :autoplay="config?.autoPlay &&  !config?.autoScroll ? {
         direction: config?.reverse ? 'backward' : 'forward',
         delay: config?.delay || 3000,
         stopOnMouseEnter:config?. pauseOnHover,
         stopOnInteraction: !config?.pauseOnHover,
         jump: false
       } : false"

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
        <template v-if="$slots.default">
         <div
           :ref="setItemRef"
           v-bind="props.item?.actions"
           :class="[{'max-w-max':config?.autoDimensioned},props.item?.padding]"
           class="content w-full min-w-0 h-full"
         >
          <slot :item="item" :index="index"/>
         </div>
        </template>
       </UCarousel>

       <!--Dots-->
       <div v-if="withDots && (dotsPosition === 'bottom' || dotsPosition === 'right')" class="shrink-0">
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
       :controls="{
        select: sliderControls?.select,
        stop: () => sliderControls?.stop(config?.autoScroll ? 'autoScroll' : 'autoplay'),
        play: () => sliderControls?.play(config?.autoScroll ? 'autoScroll' : 'autoplay')
       }"
       :move-on-over="thumbsConfig?.moveOnHover"
       :slider-config="thumbsConfig?.sliderConfig"
     />
     <!-- Thumbs End -->
    </div>
   </div>
  </div>
 </section>
</template>