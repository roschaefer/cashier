<template>
  <div class="flex flex-col space-y-1">
    <template v-if="cost">
      <button
        v-for="suggestion in suggestions"
        :key="suggestion"
        class="flex-1 bg-gray-500 font-extrabold"
        @click="$emit('update:given', suggestion)"
      >
        {{ suggestion }}
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: {
    cost: { type: Number, default: () => null },
  },
  emits: ["update:given"],
  setup(props) {
    const suggestions = computed(() => {
      let rounded = [100, 500, 1000, 2000, 5000, 10000, 20000].map(
        (bill: number) => Math.ceil(props.cost / bill) * bill
      );
      return Array.from(new Set([props.cost, ...rounded]))
        .slice(0, 5)
        .reverse();
    });
    return { suggestions };
  },
});
</script>
