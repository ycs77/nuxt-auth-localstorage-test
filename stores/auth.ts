export const useAuthStore = defineStore('auth', () => {
  const token = useLocalStorage<string | null>('nuxt-auth-test-token', null, { initOnMounted: true })
  const isAuthenticated = computed(() => !!token.value)

  function getToken() {
    return token.value
  }

  function login(newToken: string) {
    token.value = newToken
  }

  function logout() {
    token.value = null
  }

  return {
    // State
    isAuthenticated,

    // Methods
    login,
    logout,
    getToken,
  }
})
