<script setup lang="ts">
import IMedia from "~/components/IMedia.vue";

interface thumbsProps {
 items: Record<string, any>,
 activeItems: Array<number>,
 controls: Record<string, any>,
 moveOnOver?: boolean,
 sliderConfig?: Record<string, any>,
 imageConfig?: Record<string, any>,
 widthItem: string,
 heightItem: string,
}

const props = withDefaults(defineProps<thumbsProps>(), {
 moveOnOver: false,
 sliderConfig: () => ({}),
 imageConfig: () => ({}),
})

const moveOnOver = computed(() => props.moveOnOver)

const slider = {
 class: {
  viewport: `thumbs-${props.sliderConfig?.isVertical ? 'v' : 'h'}-container`
 },
 config: {
  autoDimensioned: true,
  autoPlay: props.sliderConfig?.config?.autoPlay ?? true,
  pauseOnHover: props.sliderConfig?.config?.pauseOnHover ?? true,
  dragFree: props.sliderConfig?.config?.dragFree ?? true,
  moveWithWheel: props.sliderConfig?.config?.moveWithWheel ?? true,
  speed: props.sliderConfig?.config?.speed ?? 0.6,
 },
 item: {
  class: '',
  classActive: '',
  padding: props.sliderConfig?.item?.padding ?? (props.sliderConfig?.config?.isVertical ? 'py-3' : 'px-3'),
 },
 breakPoint: props.sliderConfig?.breakPoint ?? {0: 2, "md": 3, "xl": 4},
 withDots: props.sliderConfig?.withDots ?? false,
 withNavs: props.sliderConfig?.withNavs ?? true,
 navsConfig: {
  position: props.sliderConfig?.navsConfig?.position ?? 'sides',
  margin: props.sliderConfig?.navsConfig?.margin ?? 'mx-4'
 },
 ...props.sliderConfig
}

const thumbClass = computed(() => `${props.sliderConfig?.item?.class ?? 'opacity-30 duration-300 hover:opacity-100'}`)
const activeThumbClass = computed(() => `thumb-active ${props.sliderConfig?.item?.classActive ?? 'opacity-100 '}`)
</script>

<template>
 <Slider
   :items="items"
   v-bind="slider"
   v-slot="{item, index}"
 >
  <div
    :class="[
      thumbClass,
      {[activeThumbClass] : activeItems?.includes(index)},
      heightItem || 'h-16',
      widthItem || 'w-16'
      ]"
    @mouseenter="() => moveOnOver && controls?.select(index)"
    @mouseover="() => moveOnOver && controls?.stop()"
    @mouseleave="() => moveOnOver && controls?.play()"
    @click="() => !moveOnOver && controls?.select(index)"
  >
   <img :src="item?.baseSrc" :alt="`Image ${index + 1}`" class="rounded-lg w-full h-full cursor-pointer object-cover"/>
   <!--   <IMedia-->
   <!--     :base-src="item?.baseSrc"-->
   <!--     :alt="`Image ${index + 1}`"-->
   <!--     v-bind="props.imageConfig"-->
   <!--   />-->
  </div>
 </Slider>
</template>