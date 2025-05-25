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
import { FetchError } from 'ofetch'

definePageMeta({
  middleware: 'guest',
})

const auth = useAuthStore()

const form = reactive({
  email: 'astro123@example.com',
  password: 'password',
})

const errors = shallowRef<Record<string, string[]>>({})

async function onSubmit() {
  try {
    const { token } = await $fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    auth.login(token)

    navigateTo('/dashboard')
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.status === 422) {
        errors.value = error.data.data.errors || {}
      } else {
        console.error('An unexpected error occurred:', error)
      }
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
}
</script>
