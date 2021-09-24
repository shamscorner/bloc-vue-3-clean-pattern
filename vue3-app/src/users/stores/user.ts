import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  /**
   * Current named of the user.
   */
  const savedName = ref('')
  const savedEmail = ref('')
  const previousNames = ref(new Set<string>())
  const previousEmails = ref(new Set<string>())

  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setNewName(name: string) {
    if (savedName.value)
      previousNames.value.add(savedName.value)

    savedName.value = name
  }

  function setNewEmail(email: string) {
    if (savedEmail.value)
      previousEmails.value.add(savedEmail.value)

    savedEmail.value = email
  }

  return {
    setNewName,
    otherNames,
    savedName,
    savedEmail,
    setNewEmail,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
