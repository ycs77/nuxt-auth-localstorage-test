<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">Email:</label>
        <input type="text" name="email" required v-model="form.email" />
        <span v-if="errors.email">{{ errors.email?.[0] }}</span>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" name="password" required v-model="form.password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
})

const router = useRouter()

const auth = useAuthStore()

const form = reactive({
  email: 'astro123@example.com',
  password: 'password',
})

const errors = shallowRef<Record<string, string[]>>({})

async function onSubmit() {
  errors.value = {}

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })

  if (res.ok) {
    const data = await res.json()
    const { token } = data

    auth.login(token)

    router.push('/dashboard')
  } else if (res.status === 422 || res.status === 500) {
    const data = await res.json()
    errors.value = data.errors || {}
  }
}
</script>
