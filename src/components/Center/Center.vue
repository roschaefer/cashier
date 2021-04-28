<template>
  <section class="space-y-1">
    <label
      class="cost h-32 p-4 bg-white flex flex-col"
      :class="{
        'border-double border-b-8 border-green-300': selected === 'cost',
      }"
    >
      Zu zahlen:
      <input
        disabled
        :value="format(cost)"
        class="self-center bg-white w-full text-5xl text-center border-0"
        placeholder="0,00 €"
      />
    </label>
    <label
      class="given h-32 p-4 bg-white flex flex-col"
      :class="{
        'border-double border-b-8 border-green-300': selected === 'given',
      }"
    >
      Gegeben:
      <input
        disabled
        :value="format(given)"
        class="self-center bg-white w-full text-5xl text-center border-0"
        placeholder="0,00 €"
      />
    </label>
    <label
      v-if="Number.isInteger(change)"
      class="change h-32 p-4 bg-white flex flex-col"
      :class="{
        'border-double border-b-8 border-green-300': selected === 'change',
      }"
    >
      Wechselgeld:
      <input
        disabled
        :value="format(change)"
        class="self-center bg-white w-full text-5xl text-center border-0"
        placeholder="0,00 €"
      />
    </label>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const FORMAT = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export const format = (value: number) => {
  if (!Number.isInteger(value)) return undefined;
  return FORMAT.format(value / 100.0);
};

export default defineComponent({
  props: {
    cost: { type: Number, default: () => null },
    given: { type: Number, default: () => null },
    change: { type: Number, default: () => null },
    selected: { type: String, default: () => "cost" },
  },
  setup() {
    return { format };
  },
});
</script>
