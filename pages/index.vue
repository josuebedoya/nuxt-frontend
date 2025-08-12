<script setup>
const data = {
  labels: {
    date: "20-12-2050",
    welcome: "Welcome to the home page",
    title: "Title Welcome to the home page",
    title2: "Item List",
    titleItem: "Item List",
    description2: "Texto en español",
    description5: "5This is a sample description for the item list.",
  },
  imagenes: {
    image1: {
      src: "https://persistent.imagedescriber.online/image-describer-examples/000.jpg",
      alt: "Image 1",
      order: "order-0",
    },
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

const dataStyle = {
  labels: {
    default: {
      test: "------------------",
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
      //colStart: "col-start-1",
      colPosition: "1",
    },
    welcome: {
      color: "text-gray-900",
      typeTag: "p",
      size: "text-[20px]",
      fontWeight: "font-semibold",
      order: "order-1",
      colStart: "col-start-2",
      colPosition: "0",
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
      color: "text-gray-900",
      background: "bg-red-200",
      size: "text-lg",
      order: "order-3",
      fontWeight: "font-semibold",
      colPosition: 2,
    },
    titleItem: {
      color: "text-gray-900",
      background: "bg-red-200",
      size: "text-lg",
      order: "order-4",
      // colStart: "col-start-2",
      fontWeight: "font-semibold",
    },
    description2: {
      color: "text-gray-900",
      background: "bg-red-200",
      size: "text-lg",
      order: "order-8",
      fontWeight: "font-semibold",
    },
    description5: {
      color: "text-gray-900",
      background: "bg-red-200",
      size: "text-lg",
      order: "order-3",
      fontWeight: "font-semibold",
    },
  },
  imagenes: {
    default: {
      img: "div",
      test: "text-gray-900",
    },

    image1: {
      order: "order-1",
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
      colStart: "col-start-1",
      colPosition: "",
    },
    buton2: {
      color: "text-white",
      background: "bg-primary-500",
      size: "text-sm",

      fontWeight: "font-semibold",

      order: "order-5",
      colStart: "col-start-1",
      colPosition: "2",
    },
  },
};
</script>


<template>
  <div class="grid grid-cols-2 gap-1">
    <ItemList :item="data" :styleItem="dataStyle" positioniamge="top">
    </ItemList>
    <ItemList
      :item="data"
      :styleItem="dataStyle"
      :columnsItem="3"
      :widthColumn="['w-[33.33%]', 'w-[33.33%]', 'w-[33.33%]']"
      :styleColum="['item-center', '2', '3']"
    >
    </ItemList>
    <ItemList :item="data" :styleItem="dataStyle" :columnsItem="2"> </ItemList>
    <ItemList :item="data" :styleItem="dataStyle"> </ItemList>

    <!-- <ItemList :item="data" :styleItem="dataStyle"> </ItemList>
    <ItemList :item="data" :styleItem="dataStyle"> </ItemList>
    <ItemList :item="data" :styleItem="dataStyle"> </ItemList>
    <ItemList :item="data" :styleItem="dataStyle"> </ItemList>
    <ItemList :item="data" :styleItem="dataStyle"> </ItemList> -->
  </div>
</template>

