export function useLogout() {
  const auth = useAuthStore()

  function logout() {
    auth.logout()

    navigateTo('/')
  }

  return { logout }
}
