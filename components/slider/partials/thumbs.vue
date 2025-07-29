<script setup lang="ts">
defineProps({
 items: {type: Array, required: true},
 componentThumb: {type: null, required: true},
 controls: {type: Object, required: true},
 select: {type: Function, required: true},

 isVertical: {type: Boolean, default: false},
 withNavs: {type: Boolean, default: false},
 withDots: {type: Boolean, default: false},

 itemClass: {type: String, default: ""},
 itemActiveClass: {type: String, default: ""},
 breakpoint: {type: Object, default: {0: 2, "md": 3, "xl": 4}},
 itemPadding: {type: String, default: "p-2"},
 moveWithWheel:{type: Boolean, default: false},
})
</script>

<template>
 <Slider
   :items="items"
   :component="componentThumb"
   :auto-play="false"
   items-center
   :break-point="breakpoint"
   :with-dots="withDots"
   :with-navs="withNavs"
   class-item="max-w-max"
   :viewport-class="`thumbs-${isVertical ? 'v' : 'h'}-container`"
   auto-dimensioned-viewport
   :is-vertical="isVertical"
   :padding-items="itemPadding"
   :move-with-wheel="moveWithWheel"
   centered-items
 />
</template>