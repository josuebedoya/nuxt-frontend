
<script lang="ts" setup>

 const props =  defineProps({
  typeTag: {
    type: String,
    default: "div",
  },
  classDinamic: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '',
  },
  background: {
    type: String,
    default: '',
  },
  lineHeight: {
    type: String,
    default: '',
  },
  fontWeight: {
    type: String,
    default: '',
  },
  textAlign: {
    type: String,
    default: '',
  },
  margin: {
    type: String,
    default: '',
  },
  padding: {
    type: String,
    default: '',
  },
  textTransform: {
    type: String,
    default: '',
  },
  fontFamily: {
    type: String,
    default: '',
  },
  letterSpacing: {
    type: String,
    default: '',
  },
  textDecoration: {
    type: String,
    default: '',
  },
  textOverflow: {
    type: String,
    default: '',
  },
  whiteSpace: {
    type: String,
    default: '',
  },
  overflow: {
    type: String,
    default: '',
  },
  wordBreak: {
    type: String,
    default: '',
  },
  textIndent: {
    type: String,
    default: '',
  },
});
</script>


<template>
  <component :is="typeTag"
   :class="[
    classDinamic,
    color, 
    size,
    background,
    lineHeight, 
    fontWeight, 
    textAlign, 
    margin, 
    padding, 
    textTransform, 
    fontFamily, 
    letterSpacing, 
    textDecoration, 
    textOverflow, 
    whiteSpace, 
    overflow, 
    wordBreak, 
    textIndent]">  
      <span v-if="text" v-html="text" />
      <slot v-else />
  </component>
  
</template>

<style>
</style>
