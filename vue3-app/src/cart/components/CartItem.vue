<template>
  <img :src="props.item.image" class="w-10 h-auto" />
  <div class="text-left">
    <div class="text-lg">{{ props.item.title }}</div>
    <div class="text-sm text-gray-400">
      {{ props.item.price }}
      <span class="ml-4 mr-2">Quantity</span>
      <input
        :value="props.item.quantity"
        type="number"
        class="w-20 rounded bg-gray-100 dark:bg-gray-800 px-3 py-1 mx-2 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 dark:focus:ring-offset-dark-50"
        @input="handleQuantityChange"
      />
      <VButtonText @click="handleRemoveItem">Remove from Cart</VButtonText>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CartPloc } from 'pkg-bloc-core'

interface Props {
  item: {
    id: string
    image: string
    title: string
    price: string
    quantity: number
  }
}
const props = defineProps<Props>()

const cartPloc = inject<CartPloc>('cartPloc')

const handleQuantityChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  cartPloc?.editQuantityCartItem(props.item, parseInt(target.value))
}

const handleRemoveItem = () => {
  cartPloc?.removeCartItem(props.item)
}
</script>
