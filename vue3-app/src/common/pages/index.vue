<script setup lang="ts">
const router = useRouter()
const go = () => {
  router.push('/users/home')
}

const { t } = useI18n()
</script>

<template>
  <div>
    <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>
    <p>
      <a
        rel="noreferrer"
        href="https://github.com/antfu/vitesse"
        target="_blank"
        class="underline"
      >
        Vitesse
      </a>
    </p>
    <p class="mt-4 max-w-md mx-auto">
      <em class="text-sm opacity-75">{{ t('intro.desc') }}</em>
    </p>

    <div class="py-4" />

    <div>
      <button
        class="m-3 text-sm btn"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>
