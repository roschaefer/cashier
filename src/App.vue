<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <nav class="flex items-center h-16 p-4 bg-gray-600 text-white">
      <a href="/">Cashier</a>
    </nav>
    <div class="flex-grow">
      <div class="h-full md:w-1/2 mx-auto flex flex-col justify-center">
        <Center v-model:cost="cost" :given="given" :change="change" />
      </div>
    </div>

    <div
      class="bg-gray-600 text-white p-6 py-8 flex flex-col md:flex-row space-y-4"
    >
      <div class="md:w-1/4" />
      <div class="md:w-1/2 flex space-x-4">
        <template v-if="!change">
          <Suggestions v-model:given="given" :cost="cost" class="flex-1" />
          <NumPad v-model:given="given" class="flex-1" />
        </template>
        <template v-else>
          <button
            class="back flex-1 bg-purple-500 text-white text-lg font-extrabold py-4 px-12 border-2 border-transparent hover:border-white"
            @click="change = undefined"
          >
            Zurück
          </button>
          <button
            class="next flex-1 bg-green-500 text-white text-lg font-extrabold py-4 px-12 border-2 border-transparent hover:border-white"
            @click="reset"
          >
            Nächster Kunde
          </button>
        </template>
      </div>
      <div class="md:w-1/4 flex justify-end items-end">
        <button
          v-if="!change"
          :disabled="!(Number.isInteger(given) && Number.isInteger(cost))"
          class="pay bg-green-500 text-white text-lg font-extrabold py-4 px-12 border-2 border-transparent hover:border-white"
          @click="pay"
        >
          Zahlen
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "./index.css";
import { reactive, toRefs, defineComponent } from "vue";
import NumPad from "./components/NumPad/NumPad.vue";
import Suggestions from "./components/Suggestions/Suggestions.vue";
import Center from "./components/Center/Center.vue";

export default defineComponent({
  name: "App",
  components: {
    NumPad,
    Suggestions,
    Center,
  },
  props: {
    initialData: {
      type: Object,
      default: () =>
        reactive({
          cost: undefined,
          given: undefined,
          change: undefined,
        }),
    },
  },
  setup(props) {
    const { cost, given, change } = toRefs(props.initialData);
    const reset = () => {
      cost.value = undefined;
      given.value = undefined;
      change.value = undefined;
    };
    const pay = () => {
      change.value = change.value ? undefined : given.value - cost.value;
    };
    return { given, cost, change, pay, reset };
  },
});
</script>
