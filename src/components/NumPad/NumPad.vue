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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="inline-block h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
        />
      </svg>
    </button>
    <button class="h-16 bg-gray-500 font-extrabold" @click="push(0)">0</button>
    <button
      disabled
      class="h-16 bg-gray-500 font-extrabold bg-gray-500 opacity-50 cursor-not-allowed"
    />
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
