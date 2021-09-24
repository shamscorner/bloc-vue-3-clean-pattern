<script setup lang="ts">
import { useUserStore } from '~/users/stores/user'
const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()

const name = ref(userStore.savedName)
const email = ref(userStore.savedEmail)

const choosePlans = () => {
  if (name.value && email.value) {
    userStore.setNewName(name.value)
    userStore.setNewEmail(email.value)

    router.push(`/orders/${encodeURIComponent(name.value)}`)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <v-title-lg>
      {{ t('intro.fill-up-form') }}
    </v-title-lg>

    <v-description
      m="y-5"
    >
      {{ t('no-data-saved') }}
    </v-description>

    <div class="py-4" />

    <div>
      <label class="block mb-1" text="sm gray-500" for="inputName">{{ t('intro.whats-your-name') }}</label>
      <v-input
        id="inputName"
        v-model="name"
        typeof="text"
        placeholder="John Doe"
        :aria-label="t('intro.whats-your-name')"
      />
    </div>

    <div class="py-2" />

    <div>
      <label class="block mb-1" text="sm gray-500" for="inputEmail">{{ t('intro.whats-your-email') }}</label>
      <v-input
        id="inputEmail"
        v-model="email"
        typeof="email"
        placeholder="john@example.com"
        :aria-label="t('intro.whats-your-email')"
      />
    </div>

    <div class="mt-5">
      <VButton
        text="base"
        p="x-4 y-2"
        :disabled="!name || !email"
        @click.self="choosePlans"
      >
        {{ t('button.choose-plans') }}
      </VButton>
    </div>

    <div class="mb-8">
      <VButtonText
        text="gray-500"
        font="semibold"
        p="x-4 y-2"
        @click.self="router.back()"
      >
        {{ t('button.back') }}
      </VButtonText>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
