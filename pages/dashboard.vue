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
import { FetchError } from 'ofetch'
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

  try {
    const data = await $fetch('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    user.value = data.user
  } catch (error) {
    if (error instanceof FetchError && error.status === 401) {
      auth.logout()

      router.push('/login')
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
})
</script>
