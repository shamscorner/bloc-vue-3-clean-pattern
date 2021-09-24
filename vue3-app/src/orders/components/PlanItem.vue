<script setup lang="ts">
interface Props {
  isSelected?: boolean
  planTitle: string
  planCost: number
  planDuration: string
}
const props = withDefaults(defineProps<Props>(), {
  isSelected: false,
})
</script>

<template>
  <button
    class="flex space-x-4 items-center rounded-lg transition focus:(outline-none ring-2 ring-teal-400)"
    :class="[
      props.isSelected
        ?
          'ring-2 ring-teal-400 bg-teal-50 text-teal-600 dark:bg-dark-600'
        :
          'bg-blue-50 text-gray-600 dark:(bg-dark-400 text-gray-300)'
    ]"
    p="4"
    hover="ring-2 ring-teal-400"
  >
    <div
      class="rounded-full"
      :class="[props.isSelected ? 'bg-teal-200 dark:bg-dark-100' : 'bg-blue-100 dark:bg-dark-50']"
      w="12"
      h="12"
      p="3"
    >
      <carbon-music class="inline-block" />
    </div>
    <div text="left">
      <div font="semibold">
        {{ props.planTitle }}
      </div>
      <div text="sm">
        ${{ props.planCost }} / {{ props.planDuration }}
      </div>
    </div>
  </button>
</template>
