

<script setup>
const props = defineProps({
  // === CORE PROPS ===
  component: {
    type: [Object, String],
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  componentProps: {
    type: Object,
    default: () => ({}),
  },

  // === LAYOUT PROPS ===
  layout: {
    type: String,
    default: "grid",
    validator: (value) => ["grid", "flex", "list"].includes(value),
  },
  columns: {
    type: Number,
    default: 5,
  },

  // === CONTAINER PROPS ===
  containerClass: {
    type: String,
    default: "w-full",
  },

  // === SPACING PROPS ===
  gap: {
    type: String,
    default: "gap-4",
  },
  padding: {
    type: String,
    default: "",
  },
  margin: {
    type: String,
    default: "",
  },

  // === VISUAL PROPS ===
  background: {
    type: String,
    default: "",
  },
  border: {
    type: String,
    default: "",
  },
  borderRadius: {
    type: String,
    default: "",
  },
});

// === LAYOUT COMPUTED ===
const layoutClasses = computed(() => {
  if (props.layout === "grid") {
    return `grid grid-cols-${props.columns}`;
  }
  if (props.layout === "flex") {
    return "flex flex-wrap";
  }
  if (props.layout === "list") {
    return "flex flex-col";
  }
  return "";
});

// === ITEM CLASSES COMPUTED (para flex) ===
const itemClasses = computed(() => {
  if (props.layout === "flex" && props.columns > 1) {
    // Solución simple: usar flex-basis en lugar de width
    // flex-basis respeta automáticamente el gap
    const flexBasis = (100 / props.columns).toFixed(3);
    return `flex-[0_0_${flexBasis}%] min-w-0`;
  }
  return "";
});

// === CONTAINER CLASSES COMPUTED ===
const containerClasses = computed(() => {
  return [
    layoutClasses.value,
    props.containerClass,
    props.gap,
    props.padding,
    props.margin,
    props.background,
    props.border,
    props.borderRadius,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

<template>
  <div :class="containerClasses">
    <component
      :is="component"
      v-for="(item, index) in data"
      :key="index"
      :class="itemClasses"
      v-bind="{ item, ...componentProps }"
    />
  </div>
</template>
