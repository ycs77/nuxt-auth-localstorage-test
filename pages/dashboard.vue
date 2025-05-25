<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        <LogoutButton />
      </nav>
    </header>

    <main>
      <h1>Nuxt Auth Test</h1>

      <div v-if="user">Welcome, {{ user.name }}!</div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'

definePageMeta({
  middleware: 'auth',
})

const router = useRouter()

const auth = useAuthStore()

const user = ref<User | null>(null)

onMounted(async () => {
  const token = auth.getToken()
  if (!token) return

  const res = await fetch('/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.ok) {
    const data = await res.json()
    user.value = data.user
  } else if (res.status === 401) {
    auth.logout()
    router.push('/login')
  }
})
</script>
