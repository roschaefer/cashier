<template>
  <div class="space-y-1">
    <div class="h-32 p-4 bg-white flex flex-col">
      Zu zahlen:
      <input
        class="self-center w-full text-5xl text-center border-0"
        type="number"
        placeholder="€0.00"
        :value="cost"
        @input="$emit('update:cost', Number($event.target.value))"
      />
    </div>
    <div class="h-32 p-4 bg-white flex flex-col">
      Gegeben:
      <span class="self-center w-full text-5xl text-center border-0">
        {{ format(given) }}
      </span>
    </div>
    <div v-if="change" class="h-32 p-4 bg-white flex flex-col">
      Wechselgeld:
      <span class="self-center w-full text-5xl text-center border-0">
        {{ format(change) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

const FORMAT = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export default defineComponent({
  props: {
    cost: { type: Number, default: () => null },
    given: { type: Number, default: () => null },
  },
  emits: ["update:cost"],
  setup(props) {
    const change = computed(() => {
      if (!(Number.isInteger(props.cost) && Number.isInteger(props.given)))
        return null;
      return props.given - props.cost;
    });

    return { change, format: (value) => FORMAT.format(value / 100.0) };
  },
});
</script>
