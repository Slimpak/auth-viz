<template>
  <div v-if="isAuthenticated" class="auth-wrapper">
    <slot />
  </div>
  <div v-else class="auth-screen">
    <div class="auth-message">
      Требуется аутентификация
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isAuthenticated = ref(false)

// Base64 encoded credentials
const ENCODED_CREDS = {
  email: 'Y2FtcEBjYW1wLmNhbXA=', // camp@camp.camp
  password: 'cXdlcXdlcXdlMQ==' // qweqweqwe1
}

const decodeBase64 = (str: string) => {
  try {
    return atob(str)
  } catch {
    return ''
  }
}

const authenticate = () => {
  const email = prompt('Email:')
  if (!email) return

  const password = prompt('Password:')
  if (!password) return

  const validEmail = decodeBase64(ENCODED_CREDS.email)
  const validPassword = decodeBase64(ENCODED_CREDS.password)

  if (email === validEmail && password === validPassword) {
    isAuthenticated.value = true
    sessionStorage.setItem('authStatus', 'true')
  } else {
    alert('Невірні облікові дані')
    authenticate() // Ask again
  }
}

onMounted(() => {
  if (sessionStorage.getItem('authStatus') === 'true') {
    isAuthenticated.value = true
  } else {
    authenticate()
  }
})
</script>

<style scoped>
.auth-wrapper {
  width: 100%;
  height: 100%;
}

.auth-screen {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
}

.auth-message {
  color: #cbd5e1;
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
