<template>
 <div class="flex items-center justify-center">
  <div class="w-full">
   <Slider
     :items="items"
     :active-container="false"
     :with-navs="true"
     :navs-config="{position: 'sides'}"
     :dots-config="{
      position: 'bottom'
     }"
     :with-dots="true"
     :break-point="{0:3}"
     with-thumbs
     :move-thumbs-on-hover="false"
     :thumbs-config="{
      moveOnHover: false
     }"
   >
    <template #default="{item}">
     <ITemC :component-item="item"/>
    </template>
   </Slider>
  </div>
 </div>
</template>

<script setup lang="ts">

import Slider from '@/components/slider/slider.vue'
import ITemC from '@/components/slider/itemC.vue'
import ImgC from '@/components/slider/imageC.vue'
import Media from "~/components/media.vue";

const items = [
 {
  baseSrc: 'https://picsum.photos/640/640?random=2',
  title: 'Image 1',
  summary: 'This is the summary for image 1.'
 },
 {
  baseSrc: 'https://picsum.photos/640/328?random=5',
  title: 'Image 1',
  summary: 'This is the summary for image 1.'
 }, {
  baseSrc: 'https://picsum.photos/640/640?random=3',
  title: 'Image 1',
  summary: 'This is the summary for image 1.'
 }, {
  baseSrc: 'https://picsum.photos/640/640?random=4',
  title: 'Image 1',
  summary: 'This is the summary for image 1.'
 }, {
  baseSrc: 'https://picsum.photos/528/528?random=5',
  title: 'Image 1',
  summary: 'This is the summary for image 1.'
 },
 {
  baseSrc: 'https://picsum.photos/640/640?random=6',
  title: 'Image 1',
  summary: 'This is the summary for image 1.'
 }, {
  baseSrc: 'https://picsum.photos/528/528?random=1',
  title: 'Image 1',
  summary: 'This is the summary for image 1.'
 }, {
  baseSrc: 'https://picsum.photos/640/320?random=1',
  title: 'Image 1',
  summary: 'This is the summary for image 1.'
 }, {
  baseSrc: 'https://picsum.photos/640/640?random=1',
  title: 'Image 1',
  summary: 'This is the summary for image 1.'
 },
 {
  baseSrc: 'https://picsum.photos/640/328?random=1',
  title: 'Image 1',
  summary: 'This is the summary for image 1.'
 }, {
  baseSrc: 'https://picsum.photos/468/468?random=5',
  title: 'Image 1',
  summary: 'This is the summary for image 1.'
 }, {
  baseSrc: 'https://picsum.photos/468/468?random=1',
  title: 'Image 1',
  summary: 'This is the summary for image 1.'
 }, {
  baseSrc: 'https://picsum.photos/640/640?random=10',
  title: 'Image 1',
  summary: 'This is the summary for image 1.'
 },
]
</script>
