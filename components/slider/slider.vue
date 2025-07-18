<script setup lang="ts">
import {ref, onMounted} from 'vue'
import Thumbs from './partials/thumbs.vue'

withDefaults(defineProps<{
      isActive?: boolean,
      id?: string,
      component: void,
     componentThumb : void,
      items: Object[],
      autoPlay?: boolean,
      autoScroll?: boolean,
      fade?: boolean,
      delay?: number,
      pauseOnHover?: boolean,
      loop?: boolean,
      isVertical?: boolean,
      reverse?: boolean,
      centeredItems?: boolean,
      itemsByTransition?: number,
      moveWithWheel?: boolean,
      dragFree?: boolean,

      //  NAV & DOTS PROPS
      withDots?: boolean,
      withNavs?: boolean,
      colorNavs?: string,
      sizeNavs?: string,
      variantNavs?: string,
      navPrevIcon?: string,
      navNextIcon?: string,
      navNextLabel?: string,
      navPrevLabel?: string,
      classNavs?: string,

      //THUMBS
      withThumbs?: boolean,
      verticalThumbs?: boolean,
      positionThumbs?: string,
      moveThumbsOnHover?: boolean,

      // ITEM PROPS
      classItem?: string
      classItemActive?: string
      paddingItems?: string,

    }>(),
    {
      isActive: true,
      id: "",
      autoPlay: true,
      autoScroll: false,
      fade: false,
      delay: 3000,
      pauseOnHover: false,
      loop: false,
      isVertical: false,
      reverse: false,
      centeredItems: false,
      itemsByTransition: 1,
      moveWithWheel: false,
      dragFree: false,

      //NAVS & DOTS
      withDots: true,
      withNavs: true,
      colorNavs: "primary",
      sizeNavs: "md",
      variantNavs: "ghost",
      classNavs: "",
      // Library icons => https://icones.js.org/
      navPrevIcon: "material-symbols:arrow-back-ios-new",
      navNextIcon: "material-symbols:arrow-forward-ios-rounded",

      //THUMBS
      withThumbs: false,
      verticalThumbs: false,
      positionThumbs: "left",
      moveThumbsOnHover: false,

      // ITEM
      classItem: "",
      classItemActive: "",
      paddingItems: "p-4"
    });

const carouselRef = ref(null)
const itemRefs = ref<HTMLElement[]>([])
const activeIndex = ref(0)
provide('activeIndex', activeIndex) // This to share state active with thumbs

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

  // Get elements in view from container
  const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.isIntersecting ?
              entry.target.classList.add('active')
              : entry.target.classList.remove('active')
        });
      },
      {
        root: carouselRef.value?.emblaRef,
        threshold: 1.0,
      }
  );

  itemRefs.value.forEach((el) => {
    if (el) observer.observe(el);
  });
});

// PrevItem
function onClickPrev() {
  activeIndex.value--
}

// Next Item
function onClickNext() {
  activeIndex.value++
}

// Fix select item
function onSelect(index: number) {
  activeIndex.value = index
}

// Go to select item
function select(index: number) {
  activeIndex.value = index

  carouselRef.value?.emblaApi?.scrollTo(index)
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
            viewport: `${isVertical ? 'max-w-max' : 'max-h-max'} m-auto mi-viewport-class`,
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
  </section>
</template>
