<template>
  <div class="grid grid-cols-3 grid-rows-4 gap-1">
    <button class="h-16 bg-gray-500 font-extrabold" @click="push(7)">7</button>
    <button class="h-16 bg-gray-500 font-extrabold" @click="push(8)">8</button>
    <button class="h-16 bg-gray-500 font-extrabold" @click="push(9)">9</button>
    <button class="h-16 bg-gray-500 font-extrabold" @click="push(4)">4</button>
    <button class="h-16 bg-gray-500 font-extrabold" @click="push(5)">5</button>
    <button class="h-16 bg-gray-500 font-extrabold" @click="push(6)">6</button>
    <button class="h-16 bg-gray-500 font-extrabold" @click="push(1)">1</button>
    <button class="h-16 bg-gray-500 font-extrabold" @click="push(2)">2</button>
    <button class="h-16 bg-gray-500 font-extrabold" @click="push(3)">3</button>
    <button class="h-16 bg-gray-500 font-extrabold delete" @click="pop">
      d
    </button>
    <button class="h-16 bg-gray-500 font-extrabold" @click="push(0)">0</button>
    <button disabled class="h-16 bg-gray-500 font-extrabold" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    given: { type: Number, default: () => 0 },
  },
  emits: ["update:given"],
  setup(props, context) {
    const push = (digit: number) => {
      context.emit(
        "update:given",
        Number([props.given || 0, digit].map(String).join(""))
      );
    };
    const pop = () => {
      context.emit(
        "update:given",
        Number(String(props.given).slice(0, -1)) || 0
      );
    };
    return { push, pop };
  },
});
</script>
