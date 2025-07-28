<script setup lang="ts">
import {inject} from "@vue/runtime-core";
import {onMounted, ref} from "vue";

const props = defineProps({
 items: {type: Array, required: true},
 componentThumb: {type: null, required: true},
 controls: {type: Object, required: true},
 select: {type: Function, required: true},

 isVertical: {type: Boolean, default: false},
 moveOnOver: {type: Boolean, default: false},
 withNavs: {type: Boolean, default: false},
 withDots: {type: Boolean, default: false},

 itemClass: {type: String, default: ""},
 itemActiveClass: {type: String, default: ""},
 breakpoint: {type: Object, default: {0: 2, "md": 3, "xl": 4}},
 itemPadding: {type: String, default: "p-2"}
})

const activeThumbs = inject<Ref<number[]>>('activeThumbs')

const itemRefs = ref<HTMLElement[]>([])
const setItemRef = (el: HTMLElement | null) => {
 if (el && !itemRefs.value.includes(el)) {
  itemRefs.value.push(el)
 }
}

onMounted(async () => {
 await nextTick();

 const isVertical = props.isVertical;
 const numItems = props.itemsInView;

 const itemsSizes = itemRefs.value.map(el => (isVertical ? el?.offsetHeight : el?.offsetWidth));
 const sizeContainer = Math.max(...itemsSizes) * numItems;
 const container = document.querySelector((isVertical ? '.thumbs-v-container' : '.thumbs-h-container'));

 if (container) {
  isVertical ?
    container.style.maxHeight = `${sizeContainer}px`
    : container.style.maxWidth = `${sizeContainer}px`;
 }
});
</script>

<template>
 <!-- <div-->
 <!--   class="thumbs w-full"-->
 <!--   :class="{'min-w-max': isVertical}">-->
 <!--  <div-->
 <!--    class="flex flex-nowrap  mx-auto flex-shrink-0"-->
 <!--    :class="[isVertical ? 'flex-col justify-center items-start' : 'justify-start items-center',-->
 <!--      `thumbs-${isVertical ? 'v' : 'h'}-container`,-->
 <!--      !isVertical ? 'overflow-x-auto' :'overflow-y-auto'-->
 <!--    ]"-->
 <!--    style="scrollbar-width: none; -ms-overflow-style: none;"-->
 <!--  >-->
 <!--   Thumbs -->
 <!--   <div-->
 <!--     :ref="setItemRef"-->
 <!--     v-for="(item, index) in items"-->
 <!--     :key="index"-->
 <!--     class="thumb transition-all min-w-max"-->
 <!--     :class="[-->
 <!--       itemClass,-->
 <!--       itemPadding,-->
 <!--       activeThumbs?.includes(index) && itemActiveClass,-->
 <!--      {'active': activeThumbs?.includes(index)}-->
 <!--     ]"-->
 <!--     @click=" !moveOnOver &&select(index)"-->
 <!--     @mouseenter="moveOnOver && select(index)"-->
 <!--     @mouseover="moveOnOver && controls.stop()"-->
 <!--     @mouseleave="moveOnOver && controls.play()"-->
 <!--   >-->
 <!--    <slot :thumb="item" :index="index"/>-->
 <!--   </div>-->
 <!--  </div>-->
 <!-- </div>-->

 <!--   Slider Thumbs -->
 <Slider
   :items="items"
   :component="componentThumb"
   :auto-play="false"
   items-center
   :break-point="breakpoint"
   :with-dots="withDots"
   :with-navs="withNavs"
 />
</template>