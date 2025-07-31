<script lang="ts" setup>
const props = defineProps({
  configComponentText: {
    type: Object,
    required: true,
  },
});

const {
  typeTag = "p",
  classDinamic = "",
  text = "",
  color,
  background,
  size,
  fontWeight,
  fontFamily,
  textTransform,
  letterSpacing,
  textDecoration,
  lineHeight,
  textAlign,
  margin,
  padding,
  textIndent,
  textOverflow,
  whiteSpace,
  overflow,
  wordBreak,
  opacity,
  maxWidth,
  display,
  visibility,
  hoverColor,
  transition,
  textWrap,
  order,
  icon,
} = props.configComponentText || {};

const typography = computed(() =>
  [
    color,
    background,
    size,
    fontWeight,
    fontFamily,
    textTransform,
    letterSpacing,
    textDecoration,
  ]
    .filter(Boolean)
    .join(" ")
);

const spacing = computed(() =>
  [lineHeight, textAlign, margin, padding, textIndent].filter(Boolean).join(" ")
);

const behavior = computed(() =>
  [textOverflow, whiteSpace, overflow, wordBreak].filter(Boolean).join(" ")
);

const additionalStyles = computed(() =>
  [opacity, maxWidth, display, visibility, hoverColor, transition, textWrap]
    .filter(Boolean)
    .join(" ")
);
</script>

<template>
  <component
    :is="typeTag"
    :class="[
      order,
      typography,
      spacing,
      behavior,
      additionalStyles,
      classDinamic,
    ]"
  >
    <span v-if="text" v-html="text" />
    <slot name="componentText" v-else />
  </component>
</template>

<style>
</style>
