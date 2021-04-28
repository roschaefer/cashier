<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <nav class="flex items-center h-16 p-4 bg-gray-600 text-white">
      <a href="/">Cashier</a>
    </nav>
    <div class="flex-grow">
      <div class="h-full md:w-1/2 mx-auto flex flex-col justify-center">
        <Center
          :cost="cost"
          :given="given"
          :change="change"
          :selected="selected"
        />
      </div>
    </div>

    <div
      class="bg-gray-600 text-white p-6 py-8 flex flex-col space-y-4 md:space-y-0 md:flex-row"
    >
      <div class="md:w-1/4" />
      <div
        class="md:w-1/2 flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4"
      >
        <template v-if="!Number.isInteger(change)">
          <Suggestions v-model:given="given" :cost="cost" class="flex-1" />
          <NumPad
            v-if="selected === 'cost'"
            :value="cost"
            class="flex-1"
            @update="cost = $event"
            @switch="selected = 'given'"
          />
          <NumPad
            v-else-if="selected === 'given'"
            :value="given"
            class="flex-1"
            @update="given = $event"
            @switch="selected = 'cost'"
          />
        </template>
        <template v-else>
          <button
            class="back flex-1 bg-purple-500 text-white text-lg font-extrabold py-4 px-12 border-2 border-transparent hover:border-white"
            @click="back"
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
      <div
        class="md:w-1/4 flex flex-col md:flex-row md:justify-end md:items-end"
      >
        <button
          v-if="!Number.isInteger(change)"
          :disabled="!ready"
          class="pay text-white text-lg font-extrabold py-4 px-12 border-2 border-transparent"
          :class="{
            'bg-green-500 hover:border-white': ready,
            'bg-gray-500 opacity-50 cursor-not-allowed': !ready,
          }"
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
import { computed, reactive, toRefs, defineComponent } from "vue";
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
          selected: "cost",
        }),
    },
  },
  setup(props) {
    const { cost, given, change, selected } = toRefs(props.initialData);
    const reset = () => {
      cost.value = undefined;
      given.value = undefined;
      change.value = undefined;
      selected.value = "cost";
    };
    const pay = () => {
      if (selected.value === "change") {
        change.value = undefined;
        selected.value = "cost";
      } else {
        change.value = given.value - cost.value;
        selected.value = "change";
      }
    };
    const back = () => {
      change.value = undefined;
      selected.value = "given";
    };
    const ready = computed(() => {
      return given.value >= cost.value;
    });
    return { given, cost, change, pay, reset, ready, selected, back };
  },
});
</script>
