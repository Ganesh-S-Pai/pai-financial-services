<template>
  <PfsCard class="d-flex flex-column align-center">
    <div class="mt-16 pb-16">
      <h1 class="login-title-wrapper">Login Page</h1>
      <p class="mb-6 text-gray-900"> Please enter your credentials to log in.</p>

      <v-text-field clearable v-model="email" label="Email" prepend-icon="mdi-account" variant="solo-filled"
        width="300"></v-text-field>

      <v-text-field clearable v-model="password" label="Password" prepend-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
        hint="At least 8 characters" name="input-10-1" counter @click:append="showPassword = !showPassword"
        variant="solo-filled" width="340"></v-text-field>

      <v-btn class="mb-8 mt-4" color="success" size="large" variant="elevated" block :disabled="disableLogin"
        @click="handleLogin">
        <strong> Log In </strong>
      </v-btn>
      <v-btn class="mb-8 mt-4" color="secondary" size="large" variant="outlined" block>
        <strong> Sign Up </strong>
      </v-btn>
    </div>
  </PfsCard>
</template>

<script setup lang="ts">
import PfsCard from '@/components/UI/PfsCard.vue';
import { authenticateUser, logoutUser } from '@/services/authService';
import { useCommonStore } from '@/stores/common';
import { useRedirect } from '@/utils/redirect';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { redirect } = useRedirect();

const commonStore = useCommonStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false)

const disableLogin = computed(() => email.value === '' || password.value.length < 8);

const handleLogin = () => {
  authenticateUser(email.value, password.value)
    .then(() => {
      const redirectPath = (route.query?.redirect as string) || '/';
      return redirect(redirectPath)
    })
    .catch((error) => {
      commonStore.addToast({
        message: 'Login failed. Please check your credentials and try again.',
        color: 'error'
      });
      console.error('Login failed:', error);
    });
};

onMounted(() => {
  logoutUser()
});
</script>

<style scoped>
.login-title-wrapper {
  color: rgb(74, 20, 140)
}
</style>
