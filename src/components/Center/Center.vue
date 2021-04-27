<template>
  <div class="space-y-1">
    <section class="cost h-32 p-4 bg-white flex flex-col">
      Zu zahlen:
      <form v-if="!change" @submit.prevent="updateCost" @focusout="updateCost">
        <input
          v-model="updatedCost"
          class="self-center w-full text-5xl text-center border-0"
          placeholder="0,00 €"
        />
      </form>
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
import { defineComponent, ref, watchEffect } from "vue";
import currency from "currency.js";

const FORMAT = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export const format = (value: number) => {
  if (!Number.isInteger(value)) return null;
  return FORMAT.format(value / 100.0);
};

export default defineComponent({
  props: {
    cost: { type: Number, default: () => null },
    given: { type: Number, default: () => null },
    change: { type: Number, default: () => null },
  },
  emits: ["update:cost"],
  setup(props, context) {
    const updatedCost = ref(format(props.cost));

    // TODO: remove workaround
    watchEffect(() => {
      updatedCost.value = format(props.cost);
    });

    const updateCost = () => {
      const { value } = currency(updatedCost.value, {
        separator: "",
        decimal: ",",
        symbol: "€",
      });
      context.emit("update:cost", value * 100);
      updatedCost.value = format(value * 100);
    };

    return { updateCost, format, updatedCost };
  },
});
</script>
