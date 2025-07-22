<script setup lang="ts">
import {ref,shallowRef} from 'vue'
import {ipagePagesRepository} from '#ipage/utils/repository'
import type {PageData} from '#ipage/types/pages.js'

const route = useRoute()
const page = ref<PageData>(null)
const PageComponent = shallowRef(null)

const pageSlug = route.params.slug

const {data, error} = await useAsyncData('page', () =>
    ipagePagesRepository.show(pageSlug)
)

if (error.value) {
  if (error.value?.statusCode === 404) {
    throw createError({statusCode: 404, statusMessage: 'Page Not Found'})
  }
  throw createError({statusCode: 500, statusMessage: 'Unexpected Error'})
}

page.value = data.value?.data

// Get all available component files in this folder
const components = import.meta.glob('./*.vue')
const componentPath = `./page-${page.value.id}.vue`

if (components[componentPath]) {
  PageComponent.value = defineAsyncComponent(components[componentPath])
} else {
  PageComponent.value = defineAsyncComponent(() => import('./default-page.vue'))
}
</script>

<template>
  <component :is="PageComponent" :page="page"/>
</template>
