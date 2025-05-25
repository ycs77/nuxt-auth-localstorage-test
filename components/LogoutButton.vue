<template>
  <button type="button" @click="handleLogout">
    Logout
  </button>
</template>

<script setup lang="ts">
const router = useRouter()

const auth = useAuthStore()

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>
