<script lang="ts" setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  styleItem: {
    type: Object,
    required: false,
  },
  positioniamge: {
    type: String,
    default: "top",
  },
  padding: {
    type: String,
    default: "p-4",
  },
  margin: {
    type: String,
    default: "m-6",
  },
  shadow: {
    type: String,
    default: "shadow-md",
  },
});

const positionImageClass = computed(() => {
  switch (props.positioniamge) {
    case "left":
      return "flex-row";
    case "right":
      return "flex-row-reverse";
    case "top":
      return "flex-col";
    case "bottom":
      return "flex-col-reverse";
    case "background":
      return "absolute";
    default:
      return "flex-col";
  }
});

const spacing = computed(() => `${props.padding} ${props.margin}`);

function mergeDataWithStyles(itemData: any, styleConfig: any): any {
  const mergedResult: any = {};

  for (const sectionKey in itemData) {
    const sectionData = itemData[sectionKey];
    const sectionStyles = styleConfig[sectionKey] || {};
    const defaultStyle = sectionStyles.default || {};

    if (
      typeof sectionData === "object" &&
      !Array.isArray(sectionData) &&
      sectionData !== null
    ) {
      mergedResult[sectionKey] = {};

      for (const itemKey in sectionData) {
        const itemValue = sectionData[itemKey];
        const itemStyle = sectionStyles[itemKey] || {};

        mergedResult[sectionKey][itemKey] = {
          ...defaultStyle, // Apply default styles first
          ...itemStyle, // Override with item-specific styles
          // value: itemValue, // Valor real del item
        };
      }
    }
  }

  return mergedResult;
}

// Fusiona los estilos del item y los estilos adicionales
const mergedStyles = mergeDataWithStyles(props.item, props.styleItem || {});

console.log("mergedStyles", mergedStyles);
</script>

<template>
  <div :class="['card bg-white', spacing, shadow]">
    <div :class="[positionImageClass, 'flex items-center mb-2']">
      <div class="image-componet">
        <img
          :class="[positionImageClass]"
          src="https://persistent.imagedescriber.online/image-describer-examples/000.jpg"
          alt=""
        />
      </div>
      <div class="content flex flex-col">
        <ComponentText
          v-for="(label, key) in item.labels"
          :key="key"
          :configComponentText="{
            text: label,
            ...mergedStyles.labels?.[key],
          }"
        />

        <UButton
          v-for="(button, key) in item.buttons"
          :key="key"
          :to="button.link"
          :class="mergedStyles['buttons']?.[button]"
        >
          {{ mergedStyles["buttons"]["button1"] }}
          {{ button.label }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<style>
/* Puedes añadir estilos aquí si lo necesitas */
</style>
