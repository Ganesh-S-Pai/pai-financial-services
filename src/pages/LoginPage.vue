<template>
  <PfsCard class="d-flex flex-column align-center" :loading="isLoading">
    <div class="mt-16 pb-16">
      <h1 class="login-title-wrapper text-center">Welcome</h1>
      <p class="mb-6 text-gray-900 text-center"> Please enter your credentials to log in.</p>

      <v-form ref="form" v-model="isValid" @submit.prevent="handleLogin">
        <v-text-field clearable v-model="email" type="email" label="Email" prepend-icon="mdi-account"
          variant="solo-filled" width="300" :rules="emailRules()" />

        <v-text-field clearable v-model="password" label="Password" prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
          hint="At least 8 characters" name="input-10-1" counter @click:append="showPassword = !showPassword"
          variant="solo-filled" width="340" autocomplete="on" :rules="[required]" />

        <v-btn class="mb-8 mt-4" type="submit" color="success" size="large" variant="elevated" block
          :disabled="!isValid">
          <strong> Login </strong>
        </v-btn>

        <v-btn class="mb-8 mt-4" color="secondary" size="large" variant="outlined" block @click="push('/register')">
          <strong> Register </strong>
        </v-btn>
      </v-form>
    </div>
  </PfsCard>
</template>

<script setup lang="ts">
import PfsCard from '@/components/UI/PfsCard.vue';
import { useAuthentication } from '@/services/authService';
import { useCommonStore } from '@/stores/common';
import { useFormUtils } from '@/utils/form';
import { useRouterUtil } from "@/utils/router";
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { VForm } from 'vuetify/components';

const route = useRoute();
const { push, replace } = useRouterUtil();

const commonStore = useCommonStore();
const { authenticateUser, logoutUser } = useAuthentication();

const { required, emailRules } = useFormUtils()

const form = ref<InstanceType<typeof VForm> | null>(null)
const isValid = ref(false)
const email = ref('');
const password = ref('');
const showPassword = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  if (!form.value?.validate()) {
    commonStore.addToast({
      message: 'Form is invalid!',
      color: 'error'
    });
    return
  }

  isLoading.value = true;
  try {
    await authenticateUser(email.value, password.value)
    const redirectPath = (route.query?.redirect as string) || '/';
    commonStore.addToast({
      message: 'Login successful!',
      color: 'success'
    });

    await replace(redirectPath)
  }
  catch (error) {
    commonStore.addToast({
      message: 'Login failed. Please check your credentials and try again.',
      color: 'error'
    });
    console.error('Login failed:', error);
    isLoading.value = false;
  };
}

onMounted(() => {
  logoutUser()
});
</script>

<style scoped>
.login-title-wrapper {
  color: rgb(74, 20, 140)
}
</style>
