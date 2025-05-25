<template>
  <button type="button" @click="logout">
    Logout
  </button>
</template>

<script setup lang="ts">
const { logout } = useLogout()
</script>
