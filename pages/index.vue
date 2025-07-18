<template>
  <div class="flex items-center justify-center h-full w-full">
    <div >
      <Slider
          :items="items"
          :component="ITemC"
          :component-thumb="ImgC"
          :active-container="false"
          :auto-scroll="false"
          :with-navs="true"
          :auto-play="false"
          with-thumbs
          loop
          pause-on-hover
          padding-items="p-0"
          :items-by-transition="1"
          :move-thumbs-on-hover="false"
          class-item="basis-1/1 flex items-center justify-center"
          class-item-active="opacity-100 rounded-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import Slider from '@/components/slider/slider.vue'
import ITemC from '@/components/slider/itemC.vue'
import ImgC from '@/components/slider/imageC.vue'

const items = [
  {
    image: 'https://picsum.photos/640/640?random=2',
    title: 'Image 1',
    summary: 'This is the summary for image 1.'
  },
  {
    image: 'https://picsum.photos/640/328?random=5',
    title: 'Image 1',
    summary: 'This is the summary for image 1.'
  }, {
    image: 'https://picsum.photos/640/640?random=3',
    title: 'Image 1',
    summary: 'This is the summary for image 1.'
  }, {
    image: 'https://picsum.photos/640/640?random=4',
    title: 'Image 1',
    summary: 'This is the summary for image 1.'
  }, {
    image: 'https://picsum.photos/528/528?random=5',
    title: 'Image 1',
    summary: 'This is the summary for image 1.'
  },
  {
    image: 'https://picsum.photos/640/640?random=6',
    title: 'Image 1',
    summary: 'This is the summary for image 1.'
  }, {
    image: 'https://picsum.photos/528/528?random=1',
    title: 'Image 1',
    summary: 'This is the summary for image 1.'
  }, {
    image: 'https://picsum.photos/640/320?random=1',
    title: 'Image 1',
    summary: 'This is the summary for image 1.'
  }, {
    image: 'https://picsum.photos/640/640?random=1',
    title: 'Image 1',
    summary: 'This is the summary for image 1.'
  },
  {
    image: 'https://picsum.photos/640/328?random=1',
    title: 'Image 1',
    summary: 'This is the summary for image 1.'
  }, {
    image: 'https://picsum.photos/468/468?random=5',
    title: 'Image 1',
    summary: 'This is the summary for image 1.'
  }, {
    image: 'https://picsum.photos/468/468?random=1',
    title: 'Image 1',
    summary: 'This is the summary for image 1.'
  }, {
    image: 'https://picsum.photos/640/640?random=10',
    title: 'Image 1',
    summary: 'This is the summary for image 1.'
  },
]
</script>
