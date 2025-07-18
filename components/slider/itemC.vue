<template>
  <div
      class="item-card flex flex-col items-center justify-center p-4 bg-rose-900 shadow-md shadow-white rounded-lg cursor-pointer w-full">
    <div>
      <img
          :src="componentItem?.image"
          alt="Image"
          width="100%"
          height="200"
          class="basis-1/3 rounded-lg w-[300px] h-400px]"
          style="aspect-ratio: 1 / 1; height: 200px"
      />
    </div>
    <h3 class="card-title !text-white">{{ componentItem?.title }}</h3>
    <p class="card-content !text-white">{{ componentItem?.summary }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  componentItem: Object,
}>()
</script>

<style scoped>
.card{
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-title{
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.card-content{
  font-size: 1rem;
  color: #555;
}
</style>