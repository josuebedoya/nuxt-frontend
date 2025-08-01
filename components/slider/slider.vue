<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import {useWindowSize} from "@vueuse/core";
import Thumbs from './partials/thumbs.vue'
import CsTailwind from "~/utils/csTalwind"
import Dots from "./partials/dots.vue";
import Navs from "./partials/navs.vue";

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

 //NAVS
 withNavs: {type: Boolean, default: true},
 navsColor: {type: String, default: "primary"},
 navsSize: {type: String, default: "md"},
 navsVariant: {type: String, default: "ghost"},
 navPrevIcon: {type: String, default: "material-symbols:arrow-back-ios-new"},
 navNextIcon: {type: String, default: "material-symbols:arrow-forward-ios-rounded"},
 navPrevLabel: {type: String, default: ""},
 navNextLabel: {type: String, default: ""},
 classNavs: {type: String, default: ""},
 classNav: {type: String, default: "!rounded-full"},
 navsPosition: {type: String, default: 'bottom-center'},
 navsMargin: {type: String, default: 'm-2'},

 // DOTS
 withDots: {type: Boolean, default: true},
 classDots: {type: String, default: "m-2"},
 classDot: {type: String, default: ""},
 dotsPosition: {type: String, default: 'bottom'},
 dotsPadding: {type: String, default: 'sm'},
 dotsSize: {type: String, default: 'text-[14px]'},
 dotsType: {type: String, default: 'rounded'},
 dotsVariant: {type: String, default: 'solid'},
 dotsColor: {type: String, default: 'primary'},

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
// Carousel
const carouselClass = computed(() => {
 return [`carousel${props.id}`
 ].filter(Boolean)
})
// Primary Slider
const primaryCarouselClass = computed(() => {
 const isVertical = props.navsPosition === 'vertical';
 return [
  'primary-carousel mx-auto max-w-max my-4',
  isIndividualNavs.value && 'flex justify-center items-center',
  isVertical && 'flex-col',
  props.autoDimensionedViewport && 'max-w-max'
 ].filter(Boolean)
})
// Root carousel
const rootClass = computed(() => {
 return [
  'slide-content m-auto',
  (props.withThumbs && thumbsVertical.value) && 'max-w-[95%]',
  !props.autoDimensionedViewport ? 'w-full max-w-max' : 'w-auto',
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
  CsTailwind(props.breakPoint || {}, 'basis-1/').join(' '),
  'slide !m-0 !p-0'
 ].filter(Boolean)
})

const topNavs = computed(() => props.navsPosition.startsWith('top'))
const verticalNavs = computed(() => props.navsPosition === 'vertical')
const isIndividualNavs = computed(() => props.navsPosition === 'sides' || verticalNavs.value)
const propsNavs = computed(() => {
 return {
  scrollNext,
  scrollPrev,
  containerClass: props.classNavs,
  navClass: props.classNav,
  size: props.navsSize,
  variant: props.navsVariant,
  color: props.navsColor,
  labelNext: props.navNextLabel,
  labelPrev: props.navPrevLabel,
  prevIcon: props.navPrevIcon,
  nextIcon: props.navNextIcon,
  position: props.navsPosition,
  margin: props.navsMargin
 }
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

    <!--Navs top-->
    <div v-if="withNavs && (topNavs  && !isIndividualNavs)">
     <Navs v-bind="propsNavs"/>
    </div>
    <!--Navs Top End-->

    <!-- Main Carousel -->
    <div :class="primaryCarouselClass">
     <!--Nav Prev -->
     <div v-if="withNavs && (isIndividualNavs &&( !isMobile || verticalNavs))">
      <Navs v-bind="propsNavs" :hidden-next="true" :nav-class="[classNav, {'rotate-90': verticalNavs}]"/>
     </div>
     <!--Nav Prev End-->
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
        class="w-full h-full"
        :class="paddingItems"
      >
       <component :componentItem="item" :is="component"/>

      </div>
     </UCarousel>
     <!--Nav Next -->
     <div v-if="withNavs && (isIndividualNavs &&( !isMobile || verticalNavs))">
      <Navs v-bind="propsNavs" :hidden-prev="true" :nav-class="[classNav, {'rotate-90':verticalNavs}]"/>
     </div>
     <!--Nav Next  End-->
    </div>
    <!-- Main Carousel  End-->

    <!--Navs Bottom-->
    <div v-if="withNavs && ((!topNavs && !isIndividualNavs) || (props.navsPosition === 'sides' && isMobile ))">
     <Navs v-bind="propsNavs"/>
    </div>
    <!--Navs Bottom End-->

    <!--Dots-->
    <div v-if="withDots">
     <Dots
       :dots="[...scrollSnaps]"
       :container-class="classDots"
       :scroll-to="scrollTo"
       :vertical="false"
       :dot-class="classDot"
       :size="dotsSize"
       :type="dotsType"
       :variant="dotsVariant"
       :color="dotsColor"
     />
    </div>
    <!--Dots End-->

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
