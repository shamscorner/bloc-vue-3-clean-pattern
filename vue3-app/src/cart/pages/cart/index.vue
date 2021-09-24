<script setup lang="ts">
import { CartPloc } from 'vue-bloc-core'
import { usePlocState } from '~/common/use-ploc-state'

const ploc = inject<CartPloc>('cartPloc') as CartPloc
const state = usePlocState(ploc)
</script>

<template>
  <div class="text-3xl">
    Cart Items
    <router-link to="/products">
      <VButtonText class="text-gray-300">Products</VButtonText>
    </router-link>
  </div>
  <div class="max-w-4xl mx-auto my-10">
    <div v-if="state.kind === 'LoadingCartState'">Loading...</div>
    <div v-else-if="state.kind === 'UpdatedCartState'">
      <div class="mb-10">
        <div>Total {{ state.totalItems }} items</div>
        <div>Total Price: {{ state.totalPrice }}</div>
      </div>
      <ul v-if="state.items.length > 0" class="flex flex-col space-y-8">
        <li v-for="item in state.items" :key="item.id" class="flex items-center space-x-5">
          <CartItem :item="item" />
        </li>
      </ul>
      <div v-else>No Items Available</div>
    </div>
    <div v-else-if="state.kind === 'ErrorCartState'">Something went wrong!</div>
  </div>
</template>
