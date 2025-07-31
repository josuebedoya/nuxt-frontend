<script setup>
import { link } from "#build/ui";

const data = {
  labels: {
    titl3e: "20-12-2050",
    title: "Welcome to the home page",
    title2: "Item List",
    description2: "1This is a sample description for the item list.",
    title3: "Welcome to the home page",
    title24: "Item List",
    description5: "1This is a sample description for the item list.",
    // title6: "Welcome to the home page",
    // title27: "Item List",
    // description8: "1This is a sample description for the item list.",
    // title9: "Welcome to the home page",
    // title266: "Item List",
    // description66: "1This is a sample description for the item list.",
  },
  image:
    "https://persistent.imagedescriber.online/image-describer-examples/000.jpg",

  buttons: {
    buton1: {
      label: "Ver mas",
      link: "1https://example.com",
    },
    buton2: {
      label: "Button 2",
      link: "2https://example.com",
    },
  },
};

const dataStyle = {
  labels: {
    default: {
      test: "------------------",
      typeTag: "div",
      color: "text-gray-900",
      background: "bg-red-900",
      size: "text-[10px]",
      fontWeight: "font-semibold",
      padding: "p-5",
    },

    titl3e: {
      typeTag: "h1",
      color: "text-gray-900",
      order: "order-0",
      size: "text-lg",
      fontWeight: "font-semibold",
    },
    title: {
      color: "text-blue-900",
      typeTag: "p",
      size: "text-[20px]",
      fontWeight: "font-semibold",
    },
    description66: {
      typeTag: "h5",
      color: "text-gray-900",
      order: "order-3",
      size: "text-lg",
      fontWeight: "font-semibold",
    },
    description2: {
      color: "text-gray-900",
      background: "bg-gray-200",
      size: "text-lg",
      fontWeight: "font-semibold",
    },
  },
  imgenes: {
    default: {
      img: "div",
      test: "text-gray-900",
    },
  },

  buttons: {
    default: {
      color: "text-white",
      background: "bg-white-500",
      size: "text-sm",
      fontWeight: "font-semibold",
      padding: "p-4",
      hoverColor: "hover:bg-blue-600",
    },
    buton1: {
      color: "-------------- text-white ---------",
      background: "bg-red-500",
      size: "text-sm",
      fontWeight: "font-semibold",
      padding: "p-2",
      hoverColor: "hover:bg-gray-600",
    },
    buton2: {
      color: "text-white",
      background: "bg-primary-500",
      size: "text-sm",
      fontWeight: "font-semibold",
    },
  },
};
</script>


<template>
  <div class="grid grid-cols-4 gap-4">
    <ItemList :item="data" :styleItem="dataStyle"> </ItemList>
    <ItemList :item="data" :styleItem="dataStyle"> </ItemList>
    <ItemList :item="data" :styleItem="dataStyle"> </ItemList>
    <ItemList :item="data" :styleItem="dataStyle"> </ItemList>

    <!-- <ItemList :item="data" :styleItem="dataStyle"> </ItemList>
    <ItemList :item="data" :styleItem="dataStyle"> </ItemList>
    <ItemList :item="data" :styleItem="dataStyle"> </ItemList>
    <ItemList :item="data" :styleItem="dataStyle"> </ItemList>
    <ItemList :item="data" :styleItem="dataStyle"> </ItemList> -->
  </div>
</template>

