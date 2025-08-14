<script setup lang="ts">
import {useWindowSize} from "@vueuse/core"
import type {sliderProps} from './partials/interfaces'
import {sliderDefaults} from './partials/interfaces'

import Thumbs from './partials/thumbs.vue'
import Dots from './partials/dots.vue'
import Navs from './partials/navs.vue'
import CsTailwind from '~/utils/csTalwind'

/* PROPS & SETUP */
const defaultProps = withDefaults(defineProps<sliderProps>(), sliderDefaults)
const props = useMergeData(defaultProps, sliderDefaults)

const {width} = useWindowSize()
const isMobile = computed(() => width.value <= 768)

/* REFS */
const carouselRef = ref(null)
const itemRefs = ref<HTMLElement[]>([])
const setItemRef = (el: HTMLElement | null) => el && !itemRefs.value.includes(el) && itemRefs.value.push(el)

/* EMBLA CONTROLLER */
const sliderControls = useEmblaController(carouselRef, props, itemRefs)

/* COMPUTED POSITIONS */
const navsPosition = computed(() => props.navsConfig?.position)
const dotsPosition = computed(() => props.dotsConfig?.position)
const verticalNavs = computed(() => navsPosition.value === 'vertical')
const isIndividualNavs = computed(() => ['sides', 'vertical'].includes(navsPosition.value || ''))
const topNavs = computed(() => navsPosition.value?.startsWith('top'))
const bottomNavs = computed(() => navsPosition.value?.startsWith('bottom') || (isIndividualNavs.value && isMobile.value))

/* CLASSES */
const classContainer = computed(() => [props.sizeContainer, props.activeContainer && 'mx-auto', 'overflow-x-hidden'].filter(Boolean))
const primaryCarouselClass = computed(() => {
 const isVertical = props.config?.isVertical
 const autoDim = props.config?.autoDimensioned

 return [
  'root max-w-screen grid items-center grid-col-12',
  (isIndividualNavs.value && !autoDim && !isVertical && !verticalNavs.value) && 'md:grid-cols-[max-content_1fr_max-content]',
  ((isIndividualNavs.value && autoDim) || isVertical) && !verticalNavs.value && 'md:grid-cols-[max-content_max-content_max-content] place-content-center'
 ].filter(Boolean)
})
const ubicationDotsClass = computed(() => [
 'min-w-0 overflow-hidden max-[768px]:col-span-full items-center',
 dotsPosition.value === 'right' && 'md:grid md:grid-cols-[1fr_max-content]',
 dotsPosition.value === 'left' && 'md:grid md:grid-cols-[max-content_1fr]'
].filter(Boolean))
const rootClass = computed(() => ['slide-content', props.class?.root].filter(Boolean))
const viewportClass = computed(() => [
 'm-auto viewport',
 props.config?.isVertical ? 'max-w-max' : 'max-h-max',
 props.class?.viewport
].filter(Boolean))
const containerCarouselClass = computed(() => [
 props.config?.isVertical ? '!items-center ui-v-container' : '!items-start ui-h-container',
 'slide-container justify-start !m-0',
 props.class?.container
].filter(Boolean))
const itemClass = computed(() => [
 props.config?.isVertical ? '!items-center ui-v-container' : '!items-start ui-h-container',
 props.item?.class,
 CsTailwind(props.breakPoint || {}, 'basis-1/').join(' '),
 'slide !m-0 !p-0'
].filter(Boolean))

/* CONFIG PROPS */
const propsNavs = computed(() => ({
 scrollNext: sliderControls?.scrollNext,
 scrollPrev: sliderControls?.scrollPrev,
 canScrollNext: sliderControls?.canScrollNext.value ?? false,
 canScrollPrev: sliderControls?.canScrollPrev.value ?? false,
 navClass: [props.navsConfig?.navClass, verticalNavs.value && 'rotate-90'].filter(Boolean),
 ...props.navsConfig
}))

const propsDots = computed(() => ({
 scrollTo: sliderControls?.scrollTo,
 activeDot: sliderControls?.selectedIndex,
 dots: sliderControls?.scrollSnaps.value || [],
 vertical: ['right', 'left'].includes(dotsPosition.value || '') && !isMobile.value,
 ...props.dotsConfig
}))

const thumbsProps = computed(() => ({
 activeItems: sliderControls.activeIndexes,
 controls: {
  select: sliderControls?.select,
  stop: () => sliderControls?.stop(props.config?.autoScroll ? 'autoScroll' : 'autoplay'),
  play: () => sliderControls?.play(props.config?.autoScroll ? 'autoScroll' : 'autoplay')
 },
 moveOnOver: props.thumbsConfig?.moveOnHover,
 sliderConfig: props.thumbsConfig?.sliderConfig
}))

/* AUTOPLAY / AUTOSCROLL / UI CONFIGS */
const autoPlayConfig = computed(() =>
  props.config?.autoPlay ? {
   direction: props.config.reverse ? 'backward' : 'forward',
   delay: props.config.delay || 3000,
   stopOnMouseEnter: props.config.pauseOnHover,
   stopOnInteraction: !props.config.pauseOnHover,
   jump: false
  } : false
)

const autoScrollConfig = computed(() =>
  props.config?.autoScroll ? {
   direction: props.config.reverse ? 'backward' : 'forward',
   stopOnMouseEnter: props.config.pauseOnHover,
   stopOnInteraction: !props.config.pauseOnHover,
   isPlaying: props.config.pauseOnHover,
   speed: props.config.speed
  } : false
)

const uiConfig = computed(() => ({
 root: rootClass.value,
 viewport: viewportClass.value,
 container: containerCarouselClass.value,
 item: itemClass.value
}))

/* INIT */
onMounted(async () => {
 await nextTick()
 sliderControls?.mainController()
 sliderControls?.dimensionerContainer()
})
</script>


<template>
 <section class="w-full h-auto block">
  <div :class="classContainer">
   <div :class="['carousel', { vertical: config?.isVertical }]">

    <!-- NAVS - TOP -->
    <Navs v-if="withNavs && topNavs" v-bind="propsNavs"/>

    <!-- MAIN CAROUSEL -->
    <div :class="primaryCarouselClass">

     <!-- NAV - PREV (SINGLE / VERTICAL) -->
     <div v-if="withNavs && isIndividualNavs && (!isMobile || verticalNavs)" class="shrink-0">
      <Navs v-bind="propsNavs" :hidden-next="true"/>
     </div>

     <!-- DOTS & CAROUSEL -->
     <div :class="ubicationDotsClass">

      <!-- DOTS - TOP / LEFT -->
      <div v-if="withDots && ['top', 'left'].includes(dotsPosition)" class="shrink-0">
       <Dots v-bind="propsDots"/>
      </div>

      <!-- CAROUSEL -->
      <UCarousel
        ref="carouselRef"
        :items="items"
        :active="isActive"
        v-bind="config"
        :loop="config?.loop || config?.reverse"
        :orientation="config?.isVertical ? 'vertical' : 'horizontal'"
        :wheelGestures="config?.isVertical && config?.moveWithWheel"
        :align="config?.centeredItems ? 'center' : 'start'"
        :slidesToScroll="config?.itemsByTransition"
        :inViewThreshold="0.6"
        :auto-scroll="autoScrollConfig"
        :autoplay="autoPlayConfig"
        :arrows="false"
        :dots="false"
        :ui="uiConfig"
        :breakpoints="{ 768: { slidesToScroll: 2 }, 500: { slidesToScroll: 1 } }"
        @select="sliderControls?.onSelect"
        :class-names="{ snapped: '', inView: ['active', ...props.item?.classActive?.split(' ')] }"
        v-slot="{ item, index }"
      >
       <div
         :ref="setItemRef"
         v-bind="props.item?.actions"
         class="content w-full min-w-0 h-full"
         :class="[config?.autoDimensioned && 'max-w-max', props.item?.padding]"
       >
        <slot :item="item" :index="index"/>
       </div>
      </UCarousel>

      <!-- DOTS - BOTTOM / RIGHT -->
      <div v-if="withDots && ['bottom', 'right'].includes(dotsPosition)" class="shrink-0">
       <Dots v-bind="propsDots"/>
      </div>
     </div>

     <!-- NAV - NEXT (SINGLE / VERTICAL) -->
     <div v-if="withNavs && isIndividualNavs && (!isMobile || verticalNavs)" class="shrink-0">
      <Navs v-bind="propsNavs" :hidden-prev="true"/>
     </div>
    </div>

    <!-- NAVS - BOTTOM -->
    <Navs v-if="withNavs && bottomNavs" v-bind="propsNavs"/>

    <!-- THUMBS -->
    <div v-if="withThumbs" class="thumbs-carousel my-4">
     <Thumbs :items="items" v-bind="thumbsProps"/>
    </div>
   </div>
  </div>
 </section>
</template>