<script setup lang="ts">
import variables from "./availableVariables";

interface dotsProps {
 dots: Array<number>,
 containerClass?: string | string[] | Record<string, boolean>,
 scrollTo: (index: number) => void,
 vertical?: boolean,
 dotClass?: string | string[] | Record<string, boolean>
 size?: string,
 variant?: 'outline' | 'solid',
 type?: 'square' | 'rounded' | 'bars',
 color?: string,
 margin?: string,
}

const props = withDefaults(defineProps<dotsProps>(), {
 vertical: false,
 size: 'sm',
 variant: 'solid',
 type: 'rounded',
 color: 'primary',
 margin: 'm-1'
})

const activeDot = inject<Ref<number[]>>('selectedIndex') || 0;
const classDot = computed(() => ([
 'dot',
 variables.sizes.includes(props.size) && '!py-0 px-[2px]',
 !variables.sizes.includes(props.size) && `${props.size} leading-none`,
 !variables.colors.includes(props.color) && props.color,
 props.type === 'bars' && `w-3.5 h-1 max-[768px]:max-w-2`,
 props.type === 'rounded' && 'rounded-full',
 props.type === 'square' && '!rounded-none',
 props.variant === 'solid' && '[&:not(.active)]:bg-inverted',
 props.variant === 'outline' && ` border-2`,
 props.margin,
 props.dotClass
].filter(Boolean)))
const dotProps = computed(() => ({
 color: props.color,
 variant: props.variant,
 size: props.size,
 type: props.type
}));
</script>
<template>
 <div class="dots flex justify-center items-center gap-3 my-3" :class="[containerClass, {'flex-col mx-3': vertical}]">
  <div v-for="(_, index) in dots" :key="index">
   <UButton
     class="cursor-pointer max-[768px]:text-[10px] transition-all"
     :aria-label="`slide ${ index + 1 }`"
     v-bind="dotProps"
     :class="[classDot,{'active': activeDot === index}]"
     :data-state="activeDot === index? 'active' : void 0"
     @click="scrollTo(index)"
   >
    <span class="relative block opacity-0">&#x25AA;&#x25AA;&#x25AA;</span>
   </UButton>
  </div>
 </div>
</template>
