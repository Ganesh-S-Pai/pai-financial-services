<template>
  <PfsCard class="d-flex flex-column align-center" :loading="isLoading">
    <div class="mt-6 pb-16 w-100">
      <h1 class="register-title-wrapper text-center">Welcome</h1>
      <p class="mb-6 text-gray-900 text-center">
        Please enter your credentials to log in.
      </p>

      <v-form @submit.prevent="handleRegister">
        <v-container>
          <v-row>
            <v-col cols="12" md="8" offset-md="2">
              <v-row dense>
                <v-col cols="12" md="6">
                  <v-text-field clearable v-model="registrationData.first_name" type="text" label="First Name"
                    prepend-icon="mdi-card-account-details" variant="solo-filled" autocomplete="off" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field clearable v-model="registrationData.last_name" type="text" label="Last Name"
                    prepend-icon="mdi-card-account-details-outline" variant="solo-filled" autocomplete="off" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field clearable v-model="registrationData.email" type="text" label="Email"
                    prepend-icon="mdi-email" variant="solo-filled" autocomplete="off" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field clearable v-model="registrationData.phone" type="number" label="Phone"
                    prepend-icon="mdi-phone" variant="solo-filled" :maxlength="10" autocomplete="off" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-date-input clearable v-model="registrationData.dob" label="Date of birth"
                    prepend-icon="mdi-calendar-range" variant="solo-filled" :max="maxDate" autocomplete="off" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-select clearable label="Gender" v-model="registrationData.gender"
                    :items="['Male', 'Female', 'Other', 'Prefer not to say']" prepend-icon="mdi-gender-male-female"
                    variant="solo-filled" autocomplete="off" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field clearable v-model="registrationData.password" label="Password" prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
                    hint="At least 8 characters" counter @click:append="showPassword = !showPassword"
                    variant="solo-filled" autocomplete="off" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field clearable v-model="confirmPassword" label="Confirm Password" prepend-icon="mdi-lock"
                    :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showConfirmPassword ? 'text' : 'password'" hint="At least 8 characters" counter
                    @click:append="showConfirmPassword = !showConfirmPassword" variant="solo-filled"
                    autocomplete="off" />
                </v-col>

                <v-col cols="12">
                  <v-btn class="mb-8 mt-4" type="submit" color="success" size="large" variant="elevated"
                    :disabled="disableRegister" block>
                    <strong>Register</strong>
                  </v-btn>

                  <v-btn class="mb-4" color="secondary" size="large" variant="outlined" block
                    @click="redirect('/login')">
                    <strong>Login</strong>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </PfsCard>
</template>

<script setup lang="ts">
import PfsCard from '@/components/UI/PfsCard.vue';
import { useAuthentication } from '@/services/authService';
import { useCommonStore } from '@/stores/common';
import { useRedirect } from '@/utils/redirect';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { VDateInput } from 'vuetify/labs/VDateInput';

const route = useRoute();
const { redirect } = useRedirect();
const { registerUser } = useAuthentication()
const commonStore = useCommonStore();

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
const maxDate = yesterday.toISOString().split('T')[0]

const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const registrationData = ref({
  first_name: '',
  last_name: '',
  phone: '',
  dob: '1996-04-11',
  gender: '',
  email: '',
  password: ''
})

const confirmPassword = ref('')

const disableRegister = computed(() => Object.values(registrationData.value).some(value => value === "") || confirmPassword.value === "")

const handleRegister = async () => {
  isLoading.value = true;

  const user = {
    ...registrationData.value,
    dob: registrationData.value.dob.split("T")[0] as string
  }

  try {
    await registerUser(user)
    const redirectPath = (route.query?.redirect as string) || '/';
    commonStore.addToast({
      message: 'Registered successfully!',
      color: 'success'
    });

    await redirect(redirectPath)
    isLoading.value = false;
  }
  catch (error) {
    commonStore.addToast({
      message: 'Registration failed. Please try again.',
      color: 'error'
    });
    console.error('Registration failed:', error);
    isLoading.value = false;
  };
}
</script>

<style scoped>
.w-100 {
  width: 100%;
}

.register-title-wrapper {
  color: rgb(74, 20, 140)
}
</style>
