<script setup lang="ts">
import IMedia from "~/components/IMedia.vue";

const props = defineProps({
 items: {type: Array, required: true},
 controls: {type: Object, required: true},
 moveOnOver: {type: Boolean, default: false},
 sliderConfig: {type: Object, default: {}},
 imageConfig: {type: Object, default: () => ({})}
})

const activeThumbs = inject<Ref<number[]>>('activeThumbs')
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
  class: 'max-w-max thumb ' + (props.sliderConfig?.item?.class ?? 'opacity-10 duration-300'),
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

const activeThumbClass = computed(() => `thumb-active ${props.sliderConfig?.item?.classActive ?? 'opacity-100'}`)
</script>

<template>
 <Slider
   :items="items"
   v-bind="slider"
   v-slot="{item, index}"
   :item="{
    ...slider.item,
    classActive: activeThumbs ? activeThumbClass: ''
   }"
 >
  <div
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
 </Slider>
</template>