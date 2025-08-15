<script setup>
import Icard from "~/components/Icard.vue";

const data = {
  media: {
    image1: {
      src: "https://persistent.imagedescriber.online/image-describer-examples/000.jpg",
      alt: "Image 1",
    },
  },
  labels: {
    date: "20-12-2050",
    welcome: "Welcome to the home page",
    title: "Title Welcome to the home page",
    title2: "Item List",
    titleItem: "Item List",
    description2: "Texto en español",
    description5: "5This is a sample description for the item list.",
  },
  buttons: {
    buton1: {
      label: "button 1",
      onClick: () => {
        console.log("Button clicked");
      },
    },
    buton2: {
      label: "Button 2",
    },
  },
};

const styleItem = {
  media: {
    default: {
      test: "text-gray-900",
    },
    image1: {
      order: "order-3",
      colPosition: 3,
      class: "img-class",
    },
  },

  labels: {
    default: {
      testttt: "------------------",
      typeTag: "div",
      color: "text-gray-900",
      background: "",
      size: "text-[14px]",
      fontWeight: "font-semibold",
      padding: "p-5",
      colPosition: "3",
    },

    date: {
      typeTag: "h1",
      color: "text-red-900",
      size: "text-lg",
      fontWeight: "font-semibold",
      background: "bg-red-200",
      order: "order-0",
      colPosition: 1,
    },
    welcome: {
      color: "text-gray-900",
      typeTag: "p",
      size: "text-[20px]",
      fontWeight: "font-semibold",
      order: "order-2",
      colPosition: 1,
    },
    title: {
      typeTag: "h5",
      color: "text-gray-900",
      order: "order-2",
      size: "text-lg",
      fontWeight: "font-semibold",
      colPosition: 2,
    },
    title2: {
      color: "text-red-900",
      background: "bg-red-200",
      size: "text-lg",
      order: "order-3",
      fontWeight: "font-semibold",
      colPosition: 3,
    },
    titleItem: {
      color: "text-gray-900",
      background: "bg-red-200",
      size: "text-lg",
      order: "order-4",
      fontWeight: "font-semibold",
      colPosition: 3,
    },
    description2: {
      color: "text-gray-900",
      background: "bg-red-200",
      size: "text-lg",
      order: "order-4",
      fontWeight: "font-semibold",
      colPosition: 3,
    },
    description5: {
      color: "text-gray-900",
      background: "bg-red-200",
      size: "text-lg",
      order: "order-3",
      fontWeight: "font-semibold",
      colPosition: 3,
    },
  },

  buttons: {
    default: {
      color: "text-red-500",
      background: "bg-white-500",
      size: "text-sm",
      fontWeight: "font-semibold",
      padding: "p-4",
      margin: "my-2",
      hoverColor: "hover:bg-blue-600",
    },
    buton1: {
      color: "-------------- text-red-500 ---------",
      background: "bg-gray-500 flex-1",
      size: "text-sm",
      fontWeight: "font-semibold",
      padding: "p-2",
      hoverColor: "hover:bg-gray-600",
      order: "order-5",
      colPosition: 4,
    },
    buton2: {
      color: "text-white",
      background: "bg-red-500",
      size: "text-sm",
      fontWeight: "font-semibold",
      order: "order-5",
      colPosition: 5,
    },
  },
};

const dataList = [
  data,
  data,
  data,
  data,
  data,
  data,
  data,
  data,
  data,
  data,
  data,
  data,
  data,
  data,
  data,
  data,
  data,
  data,
  data,
  data,
  data,
];
</script>


<template>
  <!-- <div class="grid grid-cols-4 gap-1" v-for="(item, index) in 3" :key="index"> -->

  <IList
    :component="Icard"
    :data="dataList"
    layout="grid"
    gap="2"
    :componentProps="{
      itemStyle: styleItem,
      padding: 'p-4',
      margin: '',
    }"
  />

  <div>---------------------------------</div>

  <!-- <Icard
    :item="data"
    :dataStyle="styleItem"
    :widthColumns="['w-[50%]', 'w-[50%]']"
    :styleColumn="['item-center', 'item-start', '3']"
    background="bg-gray-500"
  ></Icard> -->
  <!-- <Icard
    :item="data"
    :dataStyle="styleItem"
    :widthColumns="['w-[20%]', 'w-[20%]', 'w-[20%]', 'w-[20%]', 'w-[20%]']"
    :styleColumn="['item-center', 'justify-center h-100', '3']"
  >
  </Icard> -->
  <!-- <Icard :item="data" :dataStyle="styleItem"> </Icard> -->
  <!-- <Icard :item="data" :dataStyle="styleItem"> </Icard> -->
  <!-- </div> -->
</template>

