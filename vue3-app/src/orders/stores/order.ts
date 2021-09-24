import { acceptHMRUpdate, defineStore } from 'pinia'
import { Plan } from '~/orders/types/plan'

export const useOrderStore = defineStore('order', () => {
  const savedPlanTitle = ref('')
  const savedPlanCost = ref(0)
  const savedPlanDuration = ref('')

  function setCurrentPlan(plan: Plan) {
    savedPlanTitle.value = plan.title
    savedPlanCost.value = plan.cost
    savedPlanDuration.value = plan.duration
  }

  return {
    savedPlanCost,
    savedPlanTitle,
    savedPlanDuration,
    setCurrentPlan,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
