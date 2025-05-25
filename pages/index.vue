<template>
  <div>
    <header>
      <nav>
        <template v-if="auth.isAuthenticated">
          <NuxtLink to="/dashboard">Dashboard</NuxtLink>
          <LogoutButton />
        </template>
        <template v-else>
          <NuxtLink to="/login">Login</NuxtLink>
        </template>
      </nav>
    </header>

    <main>
      <h1>Nuxt Auth Test</h1>
    </main>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
</script>
