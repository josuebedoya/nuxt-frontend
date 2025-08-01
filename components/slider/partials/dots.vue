<script setup lang="ts">
const props = defineProps({
 dots: {type: Array, required: true},
 containerClass: {type: [String, Array, Object], default: 'm-2'},
 scrollTo: {type: Function, required: true},
 vertical: {type: Boolean, default: false},
 dotClass: {type: [String, Array, Object], default: ''},
 size: {type: String, default: 'sm'},
 variant: {type: String, default: 'solid'},
 type: {type: String, default: 'rounded'},
 color: {type: String, default: 'primary'},
})
const activeDot = inject<Ref<number[]>>('selectedIndex') || 0;
const avaibleSizes = ['sm', 'md', 'lg', 'xl'];
const classDot = computed(() => {
 return [
  'dot',
  avaibleSizes.includes(props.size) && '!py-0 px-[2px]',
  !avaibleSizes.includes(props.size) && `${props.size} leading-none`,
  props.type === 'bars' && `w-3.5 h-1 max-[768px]:max-w-2`,
  props.type === 'rounded' && 'rounded-full',
  props.type === 'square' && 'rounded-0',
  props.variant === 'solid' && '[&:not(.active)]:bg-inverted',
  props.variant === 'outline' && ` border-2`,
  props.dotClass
 ].filter(Boolean)
})
</script>
<template>
 <div class="dots flex justify-center items-center gap-3" :class="[containerClass, {'flex-col': vertical}]">
  <div v-for="(_, index) in dots" :key="index">
   <UButton
     class="cursor-pointer max-[768px]:text-[10px] transition-all"
     :aria-label="`slide ${ index + 1 }`"
     :color="color"
     :variant="variant"
     :size="size"
     :square="variant === 'square'"
     :class="[classDot,{'active': activeDot === index}]"
     :data-state="activeDot === index? 'active' : void 0"
     @click="scrollTo(index) || void 0"
   >
    <span class="relative block opacity-0">&#x25AA;&#x25AA;&#x25AA;</span>
   </UButton>
  </div>
 </div>
</template>
