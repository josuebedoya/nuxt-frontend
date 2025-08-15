<script lang="ts" setup>
/**
 *
==========================================
📋 USAGE EXAMPLE / EJEMPLO DE USO
==========================================

<Icard
  :item="{
    media: {
      logo: 'https://example.com/logo.png',
      banner: {
        src: 'https://example.com/banner.jpg',
        alt: 'Company Banner'
      }
    },
    labels: {
      title: 'Card Title',
      subtitle: 'Card Subtitle',
      description: {
        text: 'Long description text here',
        tag: 'p'
      }
    },
    buttons: {
      primary: {
        label: 'Primary Action',
        variant: 'primary',
        size: 'lg'
      },
      secondary: {
        label: 'Secondary',
        variant: 'outline'
      }
    }
  }"
  :item-style="{
    media: {
      default: { colPosition: 1, class: 'w-full mb-4' },
      logo: { colPosition: 1, class: 'w-16 h-16 rounded-full' },
      banner: { colPosition: 2, class: 'w-full h-32 object-cover' }
    },
    labels: {
      default: { colPosition: 1 },
      title: { colPosition: 1, class: 'text-xl font-bold text-gray-800' },
      subtitle: { colPosition: 1, class: 'text-sm text-gray-600' },
      description: { colPosition: 2, class: 'text-gray-700' }
    },
    buttons: {
      default: { colPosition: 2, class: 'mb-2' },
      primary: { colPosition: 1, class: 'w-full mb-3' },
      secondary: { colPosition: 2, class: 'w-auto' }
    }
  }"
  :width-columns="['w-1/2', 'w-1/2']"
  :style-column="['items-start', 'items-end']"
  padding="p-6"
  margin="m-4"
  shadow="shadow-lg"
  background="bg-white"
  items-alignment="items-start"
  custom-classes="rounded-lg border hover:shadow-xl transition-shadow"
/>

==========================================
📊 DATA STRUCTURE EXPLANATION
==========================================

item: {
  media: {
    [key]: string | { src: string, alt?: string }
  },
  labels: {
    [key]: string | { text: string, tag?: string, [prop]: any }
  },
  buttons: {
    [key]: { label: string, variant?: string, size?: string, [prop]: any }
  }
}

itemStyle: {
  [section]: {
    default?: { colPosition?: number, class?: string, [prop]: any },
    [itemKey]?: { colPosition?: number, class?: string, [prop]: any }
  }
}

==========================================
🎯 COLUMN POSITIONING
==========================================

colPosition: 1 = First column
colPosition: 2 = Second column
colPosition: N = Nth column

If colPosition is not specified or invalid, defaults to column 1.

==========================================
🎨 STYLING PRIORITY
==========================================

1. Item-specific styles (highest priority)
2. Section default styles
3. Component default classes (lowest priority)

Example:
itemStyle.labels.title.class = "text-xl font-bold" (wins)
itemStyle.labels.default.class = "text-base" (fallback)
 *
 */

/**
 * Icard Component
 * Renders items (media, labels, buttons) in customizable columns with dynamic styling
 */

// Component props
const props = defineProps({
  // Main data object containing items to render
  item: {
    type: Object,
    required: true,
  },
  // Style configuration for sections
  itemStyle: {
    type: Object,
    required: false,
  },
  // Array of width classes - determines column count
  widthColumns: {
    type: Array,
    default: () => ["w-[100%]"],
  },
  // Style classes for each column
  styleColumn: {
    type: Array,
    default: () => ["item-center"],
  },
  // Image position setting
  positionImage: {
    type: String,
    default: "top",
  },
  // Card padding class
  padding: {
    type: String,
    default: "p-4",
  },
  // Card margin class
  margin: {
    type: String,
    default: "m-1",
  },
  // Card shadow class
  shadow: {
    type: String,
    default: "shadow-md",
  },
  // Card background class
  background: {
    type: String,
    default: "bg-white",
  },
  // Items alignment class
  itemsAlignment: {
    type: String,
    default: "items-start",
  },
  // Additional custom classes
  customClasses: {
    type: String,
    default: "",
  },
});

// TypeScript interfaces
type ColumnItem = {
  key: string;
  value: any;
  style: any;
  styleClasses?: string; // Pre-computed CSS classes
};
type ColumnData = {
  media: ColumnItem[];
  labels: ColumnItem[];
  buttons: ColumnItem[];
};

// Computed properties
const columnsCount = computed(() => props.widthColumns.length);
const spacing = computed(() => `${props.padding} ${props.margin}`);

// Pre-computed CSS classes arrays
const mainClasses = computed(() =>
  [
    "card",
    spacing.value,
    props.shadow,
    props.background,
    props.customClasses,
  ].filter(Boolean)
);

const containerClasses = computed(() =>
  ["flex", props.itemsAlignment, columnsCount.value].filter(Boolean)
);

/**
 * Main computed: organizes data into columns and sections
 */
const columnsData = computed<ColumnData[]>(() => {
  // Initialize empty columns array
  const cols: ColumnData[] = Array.from({ length: columnsCount.value }, () => ({
    media: [],
    labels: [],
    buttons: [],
  }));

  /**
   * Assigns items to their respective columns
   * @param section - Section type (media, labels, buttons)
   * @param items - Items to assign
   * @param styleSection - Style configuration
   */
  function assignToColumn(
    section: keyof ColumnData,
    items: Record<string, any> | undefined,
    styleSection: Record<string, any> | undefined
  ) {
    if (!items) return;

    const defaultStyle = styleSection?.default || {};
    const entries = Object.entries(items);

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];

      // Merge default and specific styles
      const style = { ...defaultStyle, ...(styleSection?.[key] || {}) };

      // Pre-compute CSS classes string
      const styleClasses = Object.values(style)
        .filter((v) => typeof v === "string" && v.length > 0)
        .join(" ");

      // Validate column position
      let colPos = Number(style.colPosition);
      if (
        !colPos ||
        isNaN(colPos) ||
        colPos < 1 ||
        colPos > columnsCount.value
      ) {
        colPos = 1;
      }

      // Add item to column
      cols[colPos - 1][section].push({
        key,
        value,
        style,
        styleClasses,
      });
    }
  }

  // Process each section
  assignToColumn("media", props.item.media, props.itemStyle?.media);
  assignToColumn("labels", props.item.labels, props.itemStyle?.labels);
  assignToColumn("buttons", props.item.buttons, props.itemStyle?.buttons);

  return cols;
});
</script>

<template>
  <!-- Main card container -->
  <div :class="mainClasses">
    <!-- Flex container for columns -->
    <div :class="containerClasses">
      <!-- Column loop -->
      <div
        v-for="(col, colIndex) in columnsData"
        :key="colIndex"
        v-memo="[
          col.media.length,
          col.labels.length,
          col.buttons.length,
          colIndex,
        ]"
        :class="[
          'flex flex-col bg-amber-50',
          widthColumns[colIndex],
          styleColumn[colIndex],
        ]"
      >
        <!-- Media items -->
        <template v-if="col.media.length > 0">
          <div
            v-for="img in col.media"
            :key="img.key"
            :class="['image-componet', img.styleClasses]"
          ></div>

          <div
            v-for="img in col.media"
            :key="img.key"
            :class="['image-componet', img.styleClasses]"
          >
            <img
              :src="img.value.src || img.value"
              :alt="img.value.alt || ''"
              loading="lazy"
              decoding="async"
            />
          </div>
        </template>

        <!-- Label items -->
        <template v-if="col.labels.length > 0">
          <ComponentText
            v-for="label in col.labels"
            :key="label.key"
            :class="label.style.class"
            :configComponentText="{
              text:
                typeof label.value === 'string'
                  ? label.value
                  : label.value.text,
              ...label.style,
            }"
          />
        </template>

        <!-- Button items -->
        <template v-if="col.buttons.length > 0">
          <UButton
            v-for="button in col.buttons"
            :key="button.key"
            v-bind="button.value"
            :class="button.styleClasses"
          />
        </template>
      </div>
    </div>
  </div>
</template>
