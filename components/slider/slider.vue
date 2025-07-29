<script setup lang="ts">
import {ref, onMounted} from 'vue'
import Thumbs from './partials/thumbs.vue'
import CsTailwind from "~/utils/csTalwind";

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
 classNavs: {type: String, default: ""},

 // THUMBS
 withThumbs: {type: Boolean, default: false},
 thumbsVertical: {type: Boolean, default: false},
 positionThumbs: {type: String, default: "left"},
 moveThumbsOnHover: {type: Boolean, default: false},
 thumbsItemClass: {type: String, default: "opacity-25"},
 thumbsItemClassActive: {type: String, default: "opacity-100"},
 thumbsBreakpoint: {type: Object, default: {0: 2, "md": 3, "xl": 4}},
 thumbsItemPadding: {type: String, default: "p-2"},
 withDotsInThumbs: {type: Boolean, default: false},
 withNavsInThumbs: {type: Boolean, default: false},
 moveWithWheelThumbs: {type: Boolean, default: true},

 // ITEM
 classItem: {type: String, default: ""},
 classItemActive: {type: String, default: ""},
 paddingItems: {type: String, default: "p-4"},
})

const carouselRef = ref(null)
const itemRefs = ref<HTMLElement[]>([])
const activeIndexes = ref([])
provide('activeThumbs', activeIndexes) // This to share state active with thumbs

// Update items ref
const setItemRef = (el: HTMLElement | null) => {
 if (el && !itemRefs.value.includes(el)) {
  itemRefs.value.push(el)
 }
}

// Controller Section Active
function emblaController() {
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
function select(index: number) {
 const slideGroupIndex = Math.floor(index / props.itemsByTransition);

 carouselRef.value?.emblaApi?.scrollTo(slideGroupIndex)
 onSelect(slideGroupIndex * props.itemsByTransition);
}

// Fix select item
function onSelect(index: number) {
 const total = props.items.length
 const indexes: number[] = []

 for (let i = 0; i < props.itemsByTransition; i++) {
  const current = index + i
  indexes.push(props.loop ? current % total : current)
 }

 activeIndexes.value = indexes
}

// Stop Animation
function stop(method?: string = 'autoplay') {
 const pluginMethod = carouselRef.value?.emblaApi?.plugins()?.[method]

 if (pluginMethod) pluginMethod.stop()
}

// Play Animation
function play(method?: string = 'autoplay') {
 const pluginMethod = carouselRef.value?.emblaApi?.plugins()?.[method]

 if (pluginMethod) pluginMethod.play()
}

// Dimensions container (THIS FROM USE THUMBS)
function dimensionContainer() {
 const isVertical = props.isVertical;
 const numItems = Object.values(props.breakPoint).slice(-1)[0];
 const viewport = carouselRef.value?.emblaRef;
 const container = viewport?.childNodes[0] ?? null;
 const measurements = itemRefs.value.map(el => (isVertical ? el?.offsetHeight : el?.offsetWidth));
 const largerSize = Math.max(...measurements ?? []);
 const size = (largerSize + 2) * numItems;

 if ((viewport && container) && (props.autoDimensionedViewport || isVertical)) {
  if (isVertical) {
   viewport.style.maxHeight = `${size}px`;
   container.style.maxHeight = `${size}px`;
  } else {
   viewport.style.maxWidth = `${size}px`;
   container.style.maxWidth = `${size}px`;
  }
 }
}

onMounted(async () => {
 await nextTick();

 // Use embla Controller
 emblaController();

 // Dimensioned container
 dimensionContainer();
});

</script>
<template>
 <section :id="id" class="w-full h-auto">
  <div :class="activeContainer && sizeContainer">
   <div
     :class="[
        `carousel${id}`,
        'flex gap-8 w-full items-center',
        thumbsVertical ? 'flex-row justify-between' : 'flex-col justify-center',
     ]"
   >
    <!-- Main Carousel -->
    <div
      :class="[
          'primary-carousel grow',
          withThumbs && thumbsVertical ? 'w-[85%]' : 'w-full',
          isVertical ? 'max-w-max':'max-w-full'
      ]"
    >
     <UCarousel
       :active="isActive"
       ref="carouselRef"
       @select="onSelect"
       :items="items"
       v-slot="{ item }"
       :class-names="{
              snapped: '',
              inView: ['active', ...classItemActive.split(' ')]
       }"
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
              isPlaying: pauseOnHover
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
            root: `slide-content ${ withThumbs && thumbsVertical? 'max-w-[95%]' : 'w-full'} ${rootClass}`,
            viewport: `${isVertical ? 'max-w-max' : 'max-h-max'} m-auto viewport ${viewportClass}`,
            container: `slide-container ui-${isVertical ? 'v' : 'h'}-container ${isVertical ? '!items-center' : '!items-start'} justify-start !m-0 ${containerClass}`,
            item: `slide ${classItem} !m-0 !p-0 ${[CsTailwind(breakPoint || {}, 'basis-1/').join(' ')]}`,
            dots: 'dots !static my-3',
            controls: 'controls',
            arrows: 'navs',
            prev: `cursor-pointer ${classNavs}`,
            next: `cursor-pointer flex flex-row-reverse ${classNavs}`
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
       :component-thumb="componentThumb"
       v-slot="{ thumb }"
       :select="select"
       :is-vertical="thumbsVertical"
       :move-on-over="moveThumbsOnHover"
       :item-class="thumbsItemClass"
       :item-active-class="thumbsItemClassActive"
       :breakpoint="thumbsBreakpoint"
       :item-padding="thumbsItemPadding"
       :controls="{
              stop: () => stop(autoScroll ? 'autoScroll' : 'autoplay'),
              play: () => play(autoScroll ? 'autoScroll' : 'autoplay')
       }"
       :with-navs="withNavsInThumbs"
       :with-dots="withDotsInThumbs"
       :move-with-wheel="moveWithWheelThumbs"
     />
    </div>
    <!-- Thumbs End -->
   </div>
  </div>
 </section>
</template>
