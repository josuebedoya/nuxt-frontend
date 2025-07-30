
<script lang="ts" setup>
const props = defineProps({
  typeTag: {
    type: String,
    default: "div",
  },
  classDinamic: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  // Tipografía
  color: {
    type: String,
    default: "",
  },
  background: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "",
  },
  fontWeight: {
    type: String,
    default: "",
  },
  fontFamily: {
    type: String,
    default: "",
  },
  textTransform: {
    type: String,
    default: "",
  },
  letterSpacing: {
    type: String,
    default: "",
  },
  textDecoration: {
    type: String,
    default: "",
  },

  // spacing
  lineHeight: {
    type: String,
    default: "",
  },
  textAlign: {
    type: String,
    default: "",
  },
  margin: {
    type: String,
    default: "",
  },
  padding: {
    type: String,
    default: "",
  },
  textIndent: {
    type: String,
    default: "",
  },

  // behavior text
  textOverflow: {
    type: String,
    default: "",
  },
  whiteSpace: {
    type: String,
    default: "",
  },
  overflow: {
    type: String,
    default: "",
  },
  wordBreak: {
    type: String,
    default: "",
  },

  // style aditional
  opacity: {
    type: String,
    default: "",
  },
  maxWidth: {
    type: String,
    default: "",
  },
  display: {
    type: String,
    default: "",
  },
  visibility: {
    type: String,
    default: "",
  },
  hoverColor: {
    type: String,
    default: "",
  },
  transition: {
    type: String,
    default: "",
  },
  textWrap: {
    type: String,
    default: "", // Ej: "text-balance" o "text-pretty"
  },
});

const typography = computed(() => {
  return [
    props.color,
    props.background,
    props.size,
    props.fontWeight,
    props.fontFamily,
    props.textTransform,
    props.letterSpacing,
    props.textDecoration,
  ]
    .filter(Boolean)
    .join(" ");
});

const spacing = computed(() => {
  return [
    props.lineHeight,
    props.textAlign,
    props.margin,
    props.padding,
    props.textIndent,
  ]
    .filter(Boolean)
    .join(" ");
});

const behavior = computed(() => {
  return [props.textOverflow, props.whiteSpace, props.overflow, props.wordBreak]
    .filter(Boolean)
    .join(" ");
});

const additionalStyles = computed(() => {
  return [
    props.opacity,
    props.maxWidth,
    props.display,
    props.visibility,
    props.hoverColor,
    props.transition,
    props.textWrap,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>


<template>
  <component
    :is="typeTag"
    :class="[typography, spacing, behavior, additionalStyles, classDinamic]"
  >
    <span v-if="text" v-html="text" />
    <slot name="componentText" v-else />
  </component>
</template>

<style>
</style>
