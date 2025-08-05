<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  withIconCopyright: { type: Boolean, default: true },
  withTextCopyright: { type: Boolean, default: true },
  withYear: { type: Boolean, default: true },
  withTitleCopyright: { type: Boolean, default: true },
  withSiteName: { type: Boolean, default: true },
  name: { type: String, default: 'Rent Cars' },
  classes: { type: String, default: '' }, 
})

const year = new Date().getFullYear()
const { t } = useI18n()

const siteName = computed(() => props.name)

// Traducciones
const copyrightTitle = computed(() => t('copyright.title'))
const copyrightText = computed(() => t('copyright.text'))

</script>

<template>
    <ClientOnly>
        <p :class="`copyright ${classes}`" >
            <span v-if="withTitleCopyright"> {{ copyrightTitle }} &nbsp;</span> 
            <i v-if="withIconCopyright" class="fa-regular fa-copyright mr-1"></i>
            <span v-if="withYear"> {{ year }} &nbsp;</span> 
            <span v-if="withSiteName"> {{ siteName }} </span> 
            <span v-if="withTextCopyright">. {{ copyrightText }} </span>
        </p>
    </ClientOnly>
</template>