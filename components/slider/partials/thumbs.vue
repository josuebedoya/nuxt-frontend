<script setup lang="ts">
import {inject} from 'vue'

withDefaults(defineProps<{
  items: object[],
  select: (index: number) => void,
  isVertical?: boolean,
  moveOnOver?: boolean,
  controls: object
}>(), {
  isVertical: false,
  moveOnOver: false
});

const activeIndex = inject('activeIndex')
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
          class="opacity-25 hover:opacity-100 transition-opacity"
          :class="activeIndex === index &&  'opacity-100'"
          @click=" !moveOnOver &&select(index)"
          @mouseenter="moveOnOver && select(index)"
          @mouseover="moveOnOver && controls.stop()"
          @mouseleave="moveOnOver && controls.play()"
      >
        <slot :item="item" :index="index"/>
      </div>
    </div>
  </div>
</template>