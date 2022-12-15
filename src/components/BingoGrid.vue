<template>
  <table>
    <tbody>
      <tr v-for="(row, i) in data" :key="i">
        <td
          @click="toggleSelect(i, j)"
          :class="{
            selected: cell.selected,
          }"
          v-for="(cell, j) in row"
          :key="j"
        >
          {{ cell.word }}
        </td>
      </tr>
    </tbody>
  </table>
  <h2 v-if="won">BINGO !</h2>
</template>

<script setup lang="ts">
import { type Ref, ref, watch, computed } from "vue";

const props = withDefaults(
  defineProps<{
    words: string[];
    size: number;
  }>(),
  {}
);

const shuffle: <T>(arr: T[]) => T[] = (arr) => {
  const array = [...arr];
  const l = arr.length;
  for (let i = l - 1; i >= 0; i--) {
    const index = Math.floor(Math.random() * l);
    [array[i], array[index]] = [array[index], array[i]];
  }
  return array;
};

const gridWords = ref(
  shuffle(props.words).reduce(
    (acc, w) => {
      const lastRow = acc[acc.length - 1];
      if (lastRow.length < props.size) lastRow.push(w);
      else acc.push([w]);
      return acc;
    },
    [[]] as string[][]
  )
);

type Cell = {
  word: string;
  selected: boolean;
};

const data: Ref<Cell[][]> = ref([]);

watch(
  gridWords,
  (value) => {
    data.value = value.map((row) =>
      row.map((word) => ({
        word,
        selected: false,
      }))
    );
  },
  { immediate: true }
);

const toggleSelect = (i: number, j: number) =>
  (data.value[i][j].selected = !data.value[i][j].selected);

const iter = new Array(props.size).fill(null).map((_, i) => i);
const won = computed(() => {
  const wonRows = data.value.some((row) =>
    row.every(({ selected }) => selected)
  );
  if (wonRows) return true;

  const wonColumns = iter.some((i) =>
    iter.every((j) => data.value[j][i].selected)
  );
  return wonColumns;
});
</script>

<style scoped lang="scss">
table {
  border-collapse: collapse;
  text-align: center;
  td {
    border: 1px solid white;
    padding: 1em;
    cursor: pointer;
    position: relative;
    &.selected {
      background-color: green;
    }
    &:hover {
      &::before {
        content: "";
        background-color: #fff2;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }
}
h2 {
  text-align: center;
  font-size: 3em;
  color: #12e636;
  font-weight: bolder;
}
</style>
