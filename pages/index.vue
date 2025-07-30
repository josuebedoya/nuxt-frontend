<script setup>
import { textChangeRangeIsUnchanged } from "typescript";

const data = {
  labels: {
    titl3e: "20-12-2050",
    title: "Welcome to the home page",
    title2: "Item List",
    description2: "1This is a sample description for the item list.",
    title3: "Welcome to the home page",
    title24: "Item List",
    description5: "1This is a sample description for the item list.",
    title6: "Welcome to the home page",
    title27: "Item List",
    description8: "1This is a sample description for the item list.",
    title9: "Welcome to the home page",
    title266: "Item List",
    description66: "1This is a sample description for the item list.",
  },
  image:
    "https://persistent.imagedescriber.online/image-describer-examples/000.jpg",

  button: {
    label: "Click Me",
  },
};

const dataStyle = {
  labels: {
    titl3e: {
      typeTag: "h1",
      color: "text-gray-900",
      background: "bg-red-200",
      size: "text-lg",
      fontWeight: "font-semibold",
    },
    title: {
      color: "text-gray-900",
      background: "bg-red-200",
      size: "text-lg",
      fontWeight: "font-semibold",
    },
    description66: {
      color: "text-gray-900",
      background: "bg-gray-200",
      size: "text-lg",
      fontWeight: "font-semibold",
    },
    description2: {
      color: "text-gray-900",
      background: "bg-red-200",
      size: "text-lg",
      fontWeight: "font-semibold",
    },
  },

  button: {
    label: "Click Me",
  },
};
</script>


<template>
  <div>
    <ItemList :item="data" :styleItem="dataStyle"> </ItemList>
  </div>
</template>

