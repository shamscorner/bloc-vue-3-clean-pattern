<script setup lang="ts">
import { dependenciesLocator } from 'pkg-bloc-core'
import { usePlocState } from '~/common/use-ploc-state'

const ploc = dependenciesLocator.provideProductsPloc()
const state = usePlocState(ploc)

const searchTerm = ref('')

onMounted(() => {
  ploc.search(searchTerm.value)
})

const handleSearchProducts = () => {
  ploc.search(searchTerm.value)
}
</script>

<template>
  <div class="text-3xl">
    Products List
    <router-link to="/cart">
      <VButtonText class="text-gray-300">Cart</VButtonText>
    </router-link>
  </div>
  <div class="my-5">
    <input
      v-model="searchTerm"
      type="text"
      class="w-72 rounded bg-gray-100 dark:bg-gray-800 px-3 py-1 mx-2 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 dark:focus:ring-offset-dark-50"
    />
    <VButton @click="handleSearchProducts">Search</VButton>
  </div>
  <div class="max-w-4xl mx-auto my-10">
    <div v-if="state.kind === 'LoadingProductsState'">Loading...</div>
    <div v-else-if="state.kind === 'LoadedProductsState'">
      <ul class="flex flex-col space-y-8">
        <li v-for="product in state.products" :key="product.id" class="flex items-center space-x-5">
          <ProductItem :product="product"></ProductItem>
        </li>
      </ul>
    </div>
    <div v-else-if="state.kind === 'ErrorProductsState'">Something went wrong!</div>
  </div>
</template>
