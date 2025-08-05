<script setup>

const props = defineProps({
  address: { type: Array, required: true },
  showAddress: { type: Boolean, default: true },
  showEmail: { type: Boolean, default: true },
  showIcons: { type: Boolean, default: true },
  addressWithIcon: { type: Boolean, default: true },
  addressIcon: { type: String, default: 'fa-solid fa-map-marker-alt' }, 
  addressWithTitle: { type: Boolean, default: true },
  classIcons: { type: String, default: 'self-center mr-2' },
  classTitle: { type: String, default: 'font-bold' },
  classLinkAddress: { type: String, default: 'inline-block' },
  withHyphenAddress: { type: Boolean, default: true },
})
</script>

<template>
  <!-- Dirección  --> 
  <div v-if="showAddress && address" class="component-address">
    <div class="flex">
      <i v-if="showIcons" :class="[addressIcon,classIcons]"></i>
      <div class="content-address">
        <template v-for="(address, index) in address" :key="index">
          <span v-if="withHyphenAddress && index>0">&nbsp;-&nbsp;</span>
          <a :href="`https://google.com.co/maps/search/${address}`" target="_blank" :class="classLinkAddress">
            {{ address }} 
          </a>
        </template>
      </div>
    </div>
  </div>
</template>