<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOrderStore } from '~/orders/stores/order'
import { Plan } from '~/orders/types/plan'

const { t } = useI18n()
const router = useRouter()
const orderStore = useOrderStore()

const { savedPlanCost, savedPlanTitle, savedPlanDuration } = storeToRefs(orderStore)

const currentPlan = reactive({
  cost: savedPlanCost.value,
  title: savedPlanTitle.value,
  duration: savedPlanDuration.value,
})

const selectCurrentPlan = (plan: Plan) => {
  currentPlan.cost = plan.cost
  currentPlan.title = plan.title
  currentPlan.duration = plan.duration
}

const confirmSelectedPlan = () => {
  orderStore.setCurrentPlan(currentPlan)

  router.push('/orders/confirm')
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <v-title-lg>
      {{ t('order.order-summary') }}
    </v-title-lg>
    <v-description
      m="y-5"
    >
      {{ t('order.description') }}
    </v-description>
    <div class="flex flex-col space-y-4">
      <PlanItem
        :plan-title="`${t('order.plans.annual')} ${t('order.plan')}`"
        :plan-cost="59.99"
        :plan-duration="t('order.year')"
        :is-selected="currentPlan.duration === t('order.year')"
        @click="selectCurrentPlan({
          cost: 59.99,
          title: t('order.plans.annual'),
          duration: t('order.year')
        })"
      />
      <PlanItem
        :plan-title="`${t('order.plans.monthly')} ${t('order.plan')}`"
        :plan-cost="7.99"
        :plan-duration="t('order.month')"
        :is-selected="currentPlan.duration === t('order.month')"
        @click="selectCurrentPlan({
          cost: 7.99,
          title: t('order.plans.monthly'),
          duration: t('order.month')
        })"
      />
      <PlanItem
        :plan-title="`${t('order.plans.weekly')} ${t('order.plan')}`"
        :plan-cost="2.99"
        :plan-duration="t('order.week')"
        :is-selected="currentPlan.duration === t('order.week')"
        @click="selectCurrentPlan({
          cost: 2.99,
          title: t('order.plans.weekly'),
          duration: t('order.week')
        })"
      />
    </div>

    <div class="mb-0 mt-8">
      <VButton
        text="base"
        p="x-4 y-2"
        @click="confirmSelectedPlan"
      >
        {{ t('order.confirm-selected-plan') }}
      </VButton>
    </div>

    <div class="mb-8">
      <VButtonText
        text="gray-500"
        font="semibold"
        p="x-4 y-2"
        @click="router.back()"
      >
        {{ t('order.cancel-order') }}
      </VButtonText>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
