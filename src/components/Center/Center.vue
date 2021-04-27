<template>
  <div class="space-y-1">
    <section class="cost h-32 p-4 bg-white flex flex-col">
      Zu zahlen:
      <input
        v-if="!change"
        class="self-center w-full text-5xl text-center border-0"
        type="number"
        placeholder="€0.00"
        :value="cost"
        @input="updateCost"
      />
      <span v-else class="self-center w-full text-5xl text-center border-0">
        {{ format(cost) }}
      </span>
    </section>
    <section class="given h-32 p-4 bg-white flex flex-col">
      Gegeben:
      <span class="self-center w-full text-5xl text-center border-0">
        {{ format(given) }}
      </span>
    </section>
    <section v-if="change" class="change h-32 p-4 bg-white flex flex-col">
      Wechselgeld:
      <span class="self-center w-full text-5xl text-center border-0">
        {{ format(change) }}
      </span>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const FORMAT = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export default defineComponent({
  props: {
    cost: { type: Number, default: () => null },
    given: { type: Number, default: () => null },
    change: { type: Number, default: () => null },
  },
  emits: ["update:cost"],
  setup(props, context) {
    const updateCost = (event: Event) => {
      context.emit(
        "update:cost",
        Number((event.target as HTMLInputElement).value)
      );
    };
    const format = (value: number) => {
      if (!Number.isInteger(value)) return null;
      return FORMAT.format(value / 100.0);
    };

    return { updateCost, format };
  },
});
</script>
