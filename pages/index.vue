<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/login">Login</NuxtLink>
      </nav>
    </header>

    <main>
      <h1>Nuxt Auth Test</h1>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
})
</script>
