<script setup lang="ts">
const props = defineProps({
 items: {type: Array, required: true},
 component: {type: null, required: true},
 controls: {type: Object, required: true},
 select: {type: Function, required: true},
 moveOnOver: {type: Boolean, default: false},
 sliderConfig: {type: Object, default: {}},
})

const activeThumbs = inject<Ref<number[]>>('activeThumbs')

const slider = {
 viewportClass: `thumbs-${props.sliderConfig?.isVertical ? 'v' : 'h'}-container`,
 autoDimensionedViewport: true,

 breakPoint: props.sliderConfig?.breakPoint ?? {0: 2, "md": 3, "xl": 4},
 classItem: 'max-w-max thumb' + (props.sliderConfig?.classItem ?? ''),
 classItemActive: 'thumb-active' + (props.sliderConfig?.classItemActive ?? ''),
 paddingItems: props.sliderConfig?.paddingItems ?? (props.sliderConfig?.isVertical ? 'py-3' : 'px-3'),
 autoPlay: props.sliderConfig?.autoPlay ?? true,
 pauseOnHover: props.sliderConfig?.pauseOnHover ?? true,
 dragFree: props.sliderConfig?.dragFree ?? true,
 moveWithWheel: props.sliderConfig?.moveWithWheel ?? true,
 withDots: props.sliderConfig?.withDots ?? false,
 withNavs: props.sliderConfig?.withNavs ?? true,
 speed: props.sliderConfig?.speed ?? 0.6,
 navsConfig: {
  position: props.sliderConfig?.navsConfig?.position ?? 'sides',
  navsMargin: props.sliderConfig?.navsConfig?.navsMargin ?? 'mx-1'
 },
 ...props.sliderConfig
}
</script>

<template>
 <Slider
   :items="items"
   :component="component"
   v-bind="slider"
 />
</template>