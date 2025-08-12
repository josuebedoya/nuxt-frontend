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
  columnsItem: {
    type: Number,
    default: 1,
  },
  widthColumn: {
    type: Array,
    default: ["w-[100%]"],
  },
  styleColum: {
    type: Array,
    default: ["item-center"],
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
    default: "m-1",
  },
  shadow: {
    type: String,
    default: "shadow-md",
  },
});

// Spacing card
const spacing = computed(() => `${props.padding} ${props.margin}`);

//Options position image
const optionsPositionImage = {
  left: "flex-row",
  right: "flex-row-reverse",
  top: "flex-col",
  bottom: "flex-col-reverse",
  background: "absolute",
};

//Position Image
const positionImageClass = computed((): String => {
  return optionsPositionImage[props?.positioniamge ?? "top"];
});

//merge data with styles whit key
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
          ...itemValue,
          ...defaultStyle,
          ...itemStyle,
        };
      }
    }
  }

  return mergedResult;
}

// Search key style item
function searchkeyStyleItem(typeStyle: String, key: string) {
  if (!mergedStyles[typeStyle] || !mergedStyles[typeStyle][key]) {
    return {};
  }

  return { ...mergedStyles[typeStyle][key] };
}

// class button
const classButton = (key: string) => {
  if (!mergedStyles.buttons || !mergedStyles.buttons[key]) {
    return {};
  }

  let valueClassButton = { ...mergedStyles.buttons[key] };

  return Object.values(valueClassButton).map((value) => {
    return value;
  });
};

// Fusion Styles
const mergedStyles = mergeDataWithStyles(props.item, props.styleItem || {});

// Filtrar data por columna
function getDataForColumn(colIndex: number, typeItem: any) {
  if (!typeItem) return [];
  const result: [string, any][] = [];
  for (const [key, value] of Object.entries(typeItem)) {
    const style = searchkeyStyleItem(
      typeof typeItem === "string" ? typeItem : "labels",
      String(key)
    );
    // Si colPosition no existe, no es numérica o es inválida, va a la columna 1
    if (
      !style.colPosition ||
      isNaN(Number(style.colPosition)) ||
      Number(style.colPosition) < 1
    ) {
      if (colIndex === 1) result.push([key, value]);
      continue;
    }
    if (String(style.colPosition) === String(colIndex)) {
      result.push([key, value]);
    }
  }

  return result;
}
</script>

<template>
  <div :class="['card bg-white', spacing, shadow]">
    <div :class="[positionImageClass, 'flex items-center mb-2']">
      <!-- <div class="image-componet">
        <img
          :class="[positionImageClass]"
          src="https://persistent.imagedescriber.online/image-describer-examples/000.jpg"
          alt=""
        />
      </div> -->

      <div :class="['flex flex-wrap items-center', columnsItem]">
        <div
          v-for="colIndex in columnsItem"
          :key="colIndex"
          :class="[
            'flex flex-col bg-amber-50',
            widthColumn[colIndex - 1],
            styleColum[colIndex - 1],
          ]"
        >
          <!-- Renderizar imágenes por columna si existen -->
          <template v-if="item.imagenes">
            <div
              v-for="[key, image] in getDataForColumn(colIndex, item.imagenes)"
              :key="key"
              :class="['image-componet', classButton(String(key))]"
            >
              <img
                :class="[positionImageClass]"
                :src="image.src || image"
                :alt="image.alt || ''"
              />
            </div>
          </template>

          <!-- Renderizar textos por columna si existen -->
          <template v-if="item.labels">
            <ComponentText
              v-for="[key, label] in getDataForColumn(colIndex, item.labels)"
              :key="key"
              :configComponentText="{
                text: typeof label === 'string' ? label : label.text,
                ...searchkeyStyleItem('labels', String(key)),
              }"
            />
          </template>

          <!-- Renderizar botones por columna si existen -->
          <template v-if="item.buttons">
            <UButton
              v-for="[key, button] in getDataForColumn(colIndex, item.buttons)"
              :key="key"
              v-bind="button"
              :class="classButton(String(key))"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Puedes añadir estilos aquí si lo necesitas */
</style>
