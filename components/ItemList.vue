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

  //spacing
  padding: {
    type: String,
    default: "p-4",
  },
  margin: {
    type: String,
    default: "m-6",
  },

  //shadow
  shadow: {
    type: String,
    default: "shadow-md",
  },
});

const positionImageClass = computed(() => {
  return props.positioniamge === "left"
    ? "flex-row"
    : props.positioniamge === "right"
    ? "flex-row-reverse"
    : props.positioniamge === "top"
    ? "flex-col"
    : props.positioniamge === "bottom"
    ? "flex-col-reverse"
    : props.positioniamge === "background"
    ? "absolute"
    : "flex-col";
});

const spacing = computed(() => {
  return `${props.padding} ${props.margin}`;
});

function deepMerge(obj1: any, obj2: any): any {
  const result: any = { ...obj1 };
  Object.entries(obj2 || {}).forEach(([key, value]) => {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof result[key] === "object"
    ) {
      result[key] = deepMerge(result[key], value);
    } else {
      result[key] = value;
    }
  });
  return result;
}

const additionalStyles = deepMerge(props.item, props.styleItem || {});

console.log(additionalStyles["labels"].description2);
</script>

<template>
  <div :class="['card bg-white w-100', spacing, shadow]">
    <div :class="[positionImageClass, 'flex items-center mb-2']">
      <div class="image-componet">
        <img
          :class="[positionImageClass]"
          src="https://persistent.imagedescriber.online/image-describer-examples/000.jpg"
          alt=""
        />
      </div>

      <div class="content flex-1">
        <ComponentText
          v-for="(label, index) in item.labels"
          :key="index"
          :configComponentText="{
            ...additionalStyles.labels?.[index],
            text: label,
          }"
        />
        <UButton> Ver Mas </UButton>
      </div>
    </div>
  </div>
</template>


<style>
</style>
