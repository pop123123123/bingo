<template>
  <main>
    <h2>{{ bingo?.title }}</h2>
    <BingoGrid v-if="bingo" :words="bingo.words" :size="bingo.size" />
  </main>
</template>
<script setup lang="ts">
import { ref, type Ref } from "vue";
import BingoGrid from "./components/BingoGrid.vue";
import { type Bingo, decode } from "./lib/state";
const params = new URLSearchParams(window.location.search);

const data = params.get("bingo");
const bingo: Ref<null | Bingo> = ref(null);
if (data) bingo.value = decode(data);
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
