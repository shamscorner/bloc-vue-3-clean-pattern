<template>
  <img :src="props.product.image" class="w-10 h-auto" />
  <div class="text-left">
    <div class="text-lg">{{ props.product.title }}</div>
    <div class="text-sm text-gray-400">
      {{ formatCurrency(props.product.price) }}
      <VButtonText @click="handleAddToCart">Add to Cart</VButtonText>
      <span v-if="isAddedToCart" class="text-green-500">Added</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CartPloc } from 'pkg-bloc-core'
import { formatCurrency } from '~/common/logic'

interface Props {
  product: {
    id: string
    image: string
    title: string
    price: number
  }
}
const props = defineProps<Props>()

const cartPloc = inject<CartPloc>('cartPloc')
const isAddedToCart = ref(false)
const handleAddToCart = () => {
  cartPloc?.addProductToCart(props.product)
  isAddedToCart.value = true
}
</script>
