<script setup lang="ts">
import {ref, onMounted} from 'vue'
import Thumbs from './partials/thumbs.vue'

const props = defineProps({
  isActive: {type: Boolean, default: true},
  id: {type: String, default: ""},
  component: {type: null, required: true},
  componentThumb: {type: null, required: true},
  items: {type: Array, required: true},

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
  verticalThumbs: {type: Boolean, default: false},
  positionThumbs: {type: String, default: "left"},
  moveThumbsOnHover: {type: Boolean, default: false},

  // ITEM
  classItem: {type: String, default: ""},
  classItemActive: {type: String, default: ""},
  paddingItems: {type: String, default: "p-4"},
})

const carouselRef = ref(null)
const itemRefs = ref<HTMLElement[]>([])
const activeIndex = ref(0)
const activeIndexes = ref([])
provide('activeThumbs', activeIndexes) // This to share state active with thumbs

// Update items ref
const setItemRef = (el: HTMLElement | null) => {
  if (el && !itemRefs.value.includes(el)) {
    itemRefs.value.push(el)
  }
}

onMounted(async () => {
  await nextTick();

  // Get tallest Height item (THIS WHERE TE SLIDER IS VERTICAL ORIENTATION)
  const itemsHeight = itemRefs.value.map(el => el?.offsetHeight);
  const container = document.querySelector('.ui-v-container');

  if (container) {
    container.style.height = `${(Math.max(...itemsHeight) + 1)}px`;
  }
});

// Synchronize Indexes
function updateActiveIndexes(index: number) {
  const itemsActive = carouselRef.value?.emblaApi?.slidesInView()
  const actives = itemsActive?.map((item: number) => item + props.itemsByTransition)

  if (index !== 0 && actives) {
    activeIndexes.value = actives
  } else {
    activeIndexes.value = Array.from(
        {length: props.itemsByTransition},
        (_, i) => i
    )
  }
}

// Prev Item
function onClickPrev() {
  activeIndex.value--
  updateActiveIndexes(activeIndex.value)
}

// Next Item
function onClickNext() {
  activeIndex.value++
  updateActiveIndexes(activeIndex.value)
}

// Go to select item
function select(index: number) {
  activeIndex.value = index
  carouselRef.value?.emblaApi?.scrollTo(index)
  updateActiveIndexes(index)
}

// Fix select item
function onSelect(index: number) {
  updateActiveIndexes(index)
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

</script>
<template>
  <section :id="id" class="w-full h-auto">
    <div :class="activeContainer && sizeContainer">
      <div
          :class="[
        `carousel${id}`,
        'flex gap-8 w-full items-center',
        verticalThumbs ? 'flex-row' : 'flex-col',
        isVertical ? 'justify-center' : 'justify-between'
      ]"
      >
        <!-- Main Carousel -->
        <div
            :class="[
          'primary-carousel grow',
          withThumbs && verticalThumbs ? 'w-[85%]' : 'w-full',
          isVertical ? 'max-w-max':'max-w-full'
        ]"
        >
          <UCarousel
              :active="isActive"
              ref="carouselRef"
              @select="onSelect"
              :items="items"
              v-slot="{ item, index }"
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
              :inViewThreshold="0.8"

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
            onClick: onClickPrev
          }"
              :next="{
            label: navNextLabel,
            color: colorNavs,
            size: sizeNavs,
            variant: variantNavs,
            onClick: onClickNext
          }"
              :prev-icon="navPrevIcon.trim()"
              :next-icon="navNextIcon.trim()"
              :dots="withDots"

              :ui="{
            root: `slide-content ${ withThumbs && verticalThumbs? 'w-[95%]' : 'w-full'}`,
            viewport: `${isVertical ? 'max-w-max' : 'max-h-max'} m-auto viewport`,
            container: `slide-container ui-${isVertical ? 'v' : 'h'}-container ${isVertical ? '!items-center' : '!items-start'} justify-start !m-0`,
            item: `slide ${classItem} !m-0 !p-0`,
            dots: 'dots !static my-3',
            controls: 'controls',
            arrows: 'navs',
            prev: `cursor-pointer ${classNavs}`,
            next: `cursor-pointer flex flex-row-reverse ${classNavs}`
          }"

              :breakpoints="{

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
          'thumbs-carousel shrink-0',
          verticalThumbs ? 'flex flex-col gap-2 w-[15%] max-w-[10%]' : 'w-full flex justify-center'
        ]"
        >
          <Thumbs
              :items="items"
              v-slot="{ thumb }"
              :select="select"
              :is-vertical="verticalThumbs"
              :move-on-over="moveThumbsOnHover"
              :controls="{
              stop: () => stop(autoScroll ? 'autoScroll' : 'autoplay'),
              play: () => play(autoScroll ? 'autoScroll' : 'autoplay')
            }"
          >
            <component :item="thumb" :is="componentThumb"/>
          </Thumbs>
        </div>
        <!-- Thumbs End -->
      </div>
    </div>
  </section>
</template>
