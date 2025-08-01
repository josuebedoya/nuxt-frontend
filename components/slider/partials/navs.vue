<script setup lang="ts">
import variables from "./availableVariables";

interface navProps {
 containerClass?: string | string[] | Record<string, boolean>;
 position?: string;
 scrollNext: () => void;
 scrollPrev: () => void;
 hiddenNext?: boolean;
 hiddenPrev?: boolean;
 navClass?: string | string[] | Record<string, boolean>;
 prev?: Record<string, any>;
 next?: Record<string, any>;
 size?: string;
 variant?: string;
 color?: string,
 nextIcon?: string;
 prevIcon?: string;
 labelNext?: string;
 labelPrev?: string;
 margin?: string;
}

const props = withDefaults(defineProps<navProps>(), {
 hiddenNext: false,
 hiddenPrev: false,
 position: 'bottom-center',
 prev: () => ({}),
 next: () => ({}),
 size: 'sm',
 variant: 'ghost',
 color: 'primary',
 nextIcon: 'material-symbols:arrow-forward-ios-rounded',
 prevIcon: 'material-symbols:arrow-back-ios-new',
 margin: 'm-2'
})

const canScrollNext = inject<Ref<number[]>>('canScrollNext') || false;
const canScrollPrev = inject<Ref<number[]>>('canScrollPrev') || false;

const classNavs = computed(() => {
 return [
  'nav cursor-pointer rounded-full',
  !variables.sizes.includes(props.size) && `${props.size} leading-none`,
  !variables.colors.includes(props.color) && props.color,
  props.variant === 'outline' && ` border-2`,
  props.navClass,
  props.margin
 ].filter(Boolean)
})
const classContainer = computed(() => ([
 'justify-center',
 props.position.endsWith('left') && '!justify-start',
 props.position.endsWith('right') && '!justify-end',
 props.containerClass
].filter(Boolean)))
const navProps = computed(() => ({
 color: props.color,
 variant: props.variant,
 size: props.size,
}));
</script>

<template>
 <div class="navs flex items-center" :class="classContainer">
  <UButton
    v-if="!hiddenPrev"
    :disabled="!canScrollPrev"
    :icon="prevIcon"
    aria-label="prev"
    :label="labelPrev"
    v-bind="{
      ...navProps,
      ...prev,
    }"
    :class="classNavs"
    @click="scrollPrev()"
  />
  <UButton
    v-if="!hiddenNext"
    :disabled="!canScrollNext"
    :icon="nextIcon"
    aria-label="next"
    :label="labelNext"
    v-bind="{
     ...navProps,
     ...next,
    }"
    :class="classNavs"
    @click="scrollNext()"
  />
 </div>
</template>