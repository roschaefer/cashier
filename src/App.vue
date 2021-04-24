<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <nav class="flex items-center h-16 p-4 bg-gray-600 text-white">
      <a href="/">Cashier</a>
    </nav>
    <div class="flex-grow">
      <div class="h-full md:w-1/2 mx-auto flex flex-col justify-center">
        <Calculation />
      </div>
    </div>

    <div class="bg-gray-600 text-white p-6 py-8 flex flex-col md:flex-row space-y-4">
      <div class="md:w-1/4"></div>
      <div class="md:w-1/2 flex space-x-4">
        <Suggestions class="flex-1"/>
        <NumPad class="flex-1"/>
      </div>
      <div class="md:w-1/4 flex justify-end items-end">
        <button class="bg-green-500 text-white text-lg font-extrabold py-4 px-12 border-2 border-transparent hover:border-white">
          Zahlen
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import './index.css'
import { defineComponent } from 'vue'
import NumPad from './components/NumPad.vue'
import Suggestions from './components/Suggestions.vue'
import Calculation from './components/Calculation.vue'

export default defineComponent({
  name: 'App',
  components: {
    NumPad, Suggestions, Calculation
  }
})
</script>
