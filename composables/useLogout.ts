export function useLogout() {
  const router = useRouter()

  const auth = useAuthStore()

  function logout() {
    auth.logout()

    router.push('/')
  }

  return { logout }
}
