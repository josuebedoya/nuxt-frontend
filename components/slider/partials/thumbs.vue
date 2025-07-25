<script setup lang="ts">
import {inject} from "@vue/runtime-core";

defineProps({
  items: {type: Array, required: true},
  controls: {type: Object, required: true},
  select: {type: Function, required: true},

  isVertical: {type: Boolean, default: false},
  moveOnOver: {type: Boolean, default: false},

  itemClass: {type: String, default: ""},
  itemActiveClass: {type: String, default: ""}
})

const activeThumbs = inject<Ref<number[]>>('activeThumbs')
</script>

<template>
  <div
      class="thumbs w-full"
      :class="{'min-w-max': isVertical}">
    <div
        class="flex gap-1 justify-center pt-4 mx-auto overflow-y-auto max-h-[370px]"
        :class="{'flex-col !justify-start': isVertical}"
        style="scrollbar-width: none; -ms-overflow-style: none;">
      <div
          v-for="(item, index) in items"
          :key="index"
          class="hover:opacity-100 transition-opacity"
          :class="[
              itemClass,
              activeThumbs?.includes(index) && itemActiveClass
              ]"
          @click=" !moveOnOver &&select(index)"
          @mouseenter="moveOnOver && select(index)"
          @mouseover="moveOnOver && controls.stop()"
          @mouseleave="moveOnOver && controls.play()"
      >
        <slot :thumb="item" :index="index"/>
      </div>
    </div>
  </div>
</template>