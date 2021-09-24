<script setup lang="ts">
import { dependenciesLocator } from 'vue-bloc-core'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Bloc Pattern in Vue 3 project',
  meta: [{ name: 'description', content: 'Bloc Pattern in Vue 3 project' }],
})

provide('cartPloc', dependenciesLocator.provideCartPloc())
</script>

<template>
  <router-view />
</template>
