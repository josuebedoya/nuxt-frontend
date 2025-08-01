<script setup lang="ts">
const props = defineProps({
 containerClass: {type: [String, Array, Object], default: 'm-2'},
 position: {type: String, default: 'bottom-center'},
 scrollNext: {type: Function, required: true},
 scrollPrev: {type: Function, required: true},
 hiddenNext: {type: Boolean, default: false},
 hiddenPrev: {type: Boolean, default: false},
 navClass: {type: [String, Array, Object], default: ''},
 prev: {type: Object, default: {}},
 next: {type: Object, default: {}},
 size: {type: String, default: 'sm'},
 variant: {type: String, default: 'solid'},
 color: {type: String, default: 'primary'},
 nextIcon: {type: String, default: 'material-symbols:arrow-forward-ios-rounded'},
 prevIcon: {type: String, default: 'material-symbols:arrow-back-ios-new'},
 labelNext: {type: String, default: ''},
 labelPrev: {type: String, default: ''},
 margin: {type: String, default: 'm-5'},
})

const canScrollNext = inject<Ref<number[]>>('canScrollNext') || false;
const canScrollPrev = inject<Ref<number[]>>('canScrollPrev') || false;


const classNavs = computed(() => {
 const avaibleSizes = ['sm', 'md', 'lg', 'xl'];
 return [
  'nav',
  !avaibleSizes.includes(props.size) && `${props.size} leading-none`,
  props.variant === 'outline' && ` border-2`,
  props.navClass,
  props.margin
 ].filter(Boolean)
})
const classContainer = computed(() => {
 const position = props.position;
 return [
  'justify-center',
  position.endsWith('left') && '!justify-start',
  position.endsWith('right') && '!justify-end',
  props.containerClass
 ].filter(Boolean)
})
</script>

<template>
 <div class="navs flex items-center" :class="classContainer">
  <UButton v-if="!hiddenPrev"
           :disabled="!canScrollPrev"
           :icon="prevIcon"
           :color="color"
           :variant="variant"
           aria-label="prev"
           :label="labelPrev"
           v-bind="typeof prev === 'object' ? prev : void 0"
           :class="classNavs"
           class="cursor-pointer"
           @click="scrollPrev() || void 0"
  />
  <UButton v-if="!hiddenNext"
           :disabled="!canScrollNext"
           :icon="nextIcon"
           :color="color"
           :size="size"
           :variant="variant"
           aria-label="next"
           :label="labelNext"
           v-bind="typeof next === 'object' ? next : void 0"
           :class="classNavs"
           class="cursor-pointer"
           @click="scrollNext() || void 0"
  />
 </div>
</template>
