<script setup lang="ts">
const props = defineProps({
 items: {type: Array, required: true},
 component: {type: null, required: true},
 controls: {type: Object, required: true},
 select: {type: Function, required: true},
 moveOnOver: {type: Boolean, default: false},
 thumbsProps: {type: Object, default: {}},
})

const activeThumbs = inject<Ref<number[]>>('activeThumbs')

const sliderProps = {
 viewportClass: `thumbs-${props.thumbsProps?.isVertical ? 'v' : 'h'}-container`,
 autoDimensionedViewport: true,

 breakPoint: props.thumbsProps?.breakPoint ?? {0: 2, "md": 3, "xl": 4},
 classItem: 'max-w-max thumb' + (props.thumbsProps?.classItem ?? ''),
 classItemActive: 'thumb-active' + (props.thumbsProps?.classItemActive ?? ''),
 paddingItems: props.thumbsProps?.paddingItems ?? (props.thumbsProps?.isVertical ? 'py-3' : 'px-3'),
 autoPlay: props.thumbsProps?.autoPlay ?? true,
 pauseOnHover: props.thumbsProps?.pauseOnHover ?? true,
 dragFree: props.thumbsProps?.dragFree ?? true,
 moveWithWheel: props.thumbsProps?.moveWithWheel ?? true,
 speed: props.thumbsProps?.speed ?? 0.6,
 ...props.thumbsProps
}
</script>

<template>
 <Slider
   :items="items"
   :component="component"
   v-bind="sliderProps"
 />
</template>