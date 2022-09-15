<script setup lang="ts">
import { ref } from "@vue/reactivity";
import DTable from "./components/DTable.vue";
const columns = ref([
  { id: 1, value: "ID" },
  { id: 2, value: "Column1" },
  { id: 3, value: "Column2222222222222222" },
  { id: 4, value: "Column3333" },
  { id: 5, value: "Column44" },
  { id: 6, value: "Column5666666" }
]);

const rows = ref([
  {
    id: 1,
    value: [
      { id: 1, value: "1" },
      { id: 2, value: "Row 1 Col 1" },
      { id: 3, value: "Row 1 Col 2" },
      { id: 4, value: "Row 1 Col 3" },
      { id: 5, value: "Row 1 Col 4" },
      { id: 6, value: "Row 1 Col 5" }
    ]
  },
  {
    id: 2,
    value: [
      { id: 1, value: "2" },
      { id: 2, value: "Row 2 Col 1" },
      { id: 3, value: "Row 2 Col 2" },
      { id: 4, value: "Row 2 Col 3" },
      { id: 5, value: "Row 2 Col 4" },
      { id: 6, value: "Row 2 Col 5" }
    ]
  },
  {
    id: 3,
    value: [
      { id: 1, value: "3" },
      { id: 2, value: "Row 3 Col 1" },
      { id: 3, value: "Row 3 Col 2" },
      { id: 4, value: "Row 3 Col 3" },
      { id: 5, value: "Row 3 Col 4" },
      { id: 6, value: "Row 3 Col 5" }
    ]
  },
  {
    id: 4,
    value: [
      { id: 1, value: "4" },
      { id: 2, value: "Row 4 Col 1" },
      { id: 3, value: "Row 4 Col 2" },
      { id: 4, value: "Row 4 Col 3" },
      { id: 5, value: "Row 4 Col 4" },
      { id: 6, value: "Row 4 Col 5" }
    ]
  },
  {
    id: 5,
    value: [
      { id: 1, value: "5" },
      { id: 2, value: "Row 5 Col 1" },
      { id: 3, value: "Row 5 Col 2" },
      { id: 4, value: "Row 5 Col 3" },
      { id: 5, value: "Row 5 Col 4" },
      { id: 6, value: "Row 5 Col 5" }
    ]
  },
  {
    id: 6,
    value: [
      { id: 1, value: "6" },
      { id: 2, value: "Row 6 Col 1" },
      { id: 3, value: "Row 6 Col 2" },
      { id: 4, value: "Row 6 Col 3" },
      { id: 5, value: "Row 6 Col 4" },
      { id: 6, value: "Row 6 Col 5" }
    ]
  },
  {
    id: 7,
    value: [
      { id: 1, value: "7" },
      { id: 2, value: "Row 7 Col 1" },
      { id: 3, value: "Row 7 Col 2" },
      { id: 4, value: "Row 7 Col 3" },
      { id: 5, value: "Row 7 Col 4" },
      { id: 6, value: "Row 7 Col 5" }
    ]
  },
  {
    id: 8,
    value: [
      { id: 1, value: "8" },
      { id: 2, value: "Row 8 Col 1" },
      { id: 3, value: "Row 8 Col 2" },
      { id: 4, value: "Row 8 Col 3" },
      { id: 5, value: "Row 8 Col 4" },
      { id: 6, value: "Row 8 Col 5" }
    ]
  },
  {
    id: 9,
    value: [
      { id: 1, value: "9" },
      { id: 2, value: "Row 9 Col 1" },
      { id: 3, value: "Row 9 Col 2" },
      { id: 4, value: "Row 9 Col 3" },
      { id: 5, value: "Row 9 Col 4" },
      { id: 6, value: "Row 9 Col 5" }
    ]
  }
]);
</script>

<template>
  <DTable v-model:columns="columns" v-model:rows="rows" />
</template>

<style scoped></style>
