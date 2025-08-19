<script setup lang="ts">
import IMedia from "~/components/IMedia.vue";

interface ThumbsProps {
 items: Record<string, any>
 activeItems: object
 controls: Record<string, any>
 moveOnOver?: boolean
 sliderConfig?: Record<string, any>
 imageConfig?: Record<string, any>
 widthItem?: string
 heightItem?: string
}

const props = withDefaults(defineProps<ThumbsProps>(), {
 moveOnOver: false,
 widthItem: 'w-16',
 heightItem: 'h-16',
 sliderConfig: () => ({}),
 imageConfig: () => ({}),
});

const moveOnOver = computed(() => props.moveOnOver)

const slider = computed(() => {
 const config = props.sliderConfig || {};
 const isVertical = config.isVertical ?? false

 return {
  classes: {
   viewport: `thumbs-${isVertical ? 'v' : 'h'}-container`,
  },
  config: {
   autoDimensioned: true,
   autoPlay: config.autoPlay ?? true,
   pauseOnHover: config.pauseOnHover ?? true,
   dragFree: config.dragFree ?? true,
   moveWithWheel: config.moveWithWheel ?? true,
   speed: config.speed ?? 0.6,
  },
  item: {
   class: '',
   classActive: '',
   padding: config.item?.padding ?? (isVertical ? 'py-3' : 'px-3'),
  },
  breakPoint: config.breakPoint ?? {0: 2, md: 3, xl: 4},
  withDots: config.withDots ?? false,
  withNavs: config.withNavs ?? true,
  navsConfig: {
   position: config.navsConfig?.position ?? 'sides',
   margin: config.navsConfig?.margin ?? 'mx-4',
  },
  ...config,
 };
});

const thumbClass = computed(() => props.sliderConfig?.item?.class ?? 'opacity-30 duration-300 hover:opacity-100')
const activeThumbClass = computed(() => `thumb-active ${props.sliderConfig?.item?.classActive ?? 'opacity-100'}`)
const activeThumbsIndexes = computed(() => props.activeItems || [])
</script>

<template>
 <Slider
   :items="items"
   v-bind="slider"
 >
  <template #default="{item, index}">
   <div
     :class="[
      thumbClass,
      {[activeThumbClass] : Array.isArray(activeThumbsIndexes) && activeThumbsIndexes?.includes(index)},
      heightItem,
      widthItem
      ]"
     @mouseenter="() => moveOnOver && controls?.select(index)"
     @mouseover="() => moveOnOver && controls?.stop()"
     @mouseleave="() => moveOnOver && controls?.play()"
     @click="() => !moveOnOver && controls?.select(index)"
   >
    <IMedia
      :base-src="item?.baseSrc"
      :alt="`Image ${index + 1}`"
      v-bind="props.imageConfig"
    />
   </div>
  </template>
 </Slider>
</template>