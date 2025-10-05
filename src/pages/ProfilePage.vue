<template>
  <v-container class="pa-4" fluid>
    <PfsCard elevation="3" class="mx-auto my-8">
      <v-card-title>
        <v-icon class="mr-2">mdi-account-circle</v-icon>
        <span class="text-h6 font-weight-bold">User Profile</span>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="6">
            <strong>First Name:</strong> {{ user.first_name }}
          </v-col>
          <v-col cols="12" sm="6">
            <strong>Last Name:</strong> {{ user.last_name }}
          </v-col>

          <v-col cols="12" sm="6">
            <strong>Email:</strong> {{ user.email }}
          </v-col>
          <v-col cols="12" sm="6">
            <strong>Date of Birth:</strong> {{ formattedDOB }}
          </v-col>

          <v-col cols="12" sm="6">
            <strong>Gender:</strong> {{ user.gender }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="editProfile">
          <v-icon left>mdi-pencil</v-icon> Edit Profile
        </v-btn>
      </v-card-actions>
    </PfsCard>
  </v-container>
</template>

<script setup lang="ts">
import PfsCard from '@/components/UI/PfsCard.vue'
import { ref, computed } from 'vue'

// Example User object (replace with your store/api)
interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  dob: string
  gender: string
}

// Dummy user data for demonstration
const user = ref<User>({
  id: '1',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  dob: '1990-06-15',
  gender: 'Male'
})

// Format DOB nicely
const formattedDOB = computed(() => {
  const date = new Date(user.value.dob)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
})

function editProfile() {
  // Redirect to edit page or open dialog
  console.log('Edit profile clicked')
}
</script>

<style scoped>
.v-card-title {
  align-items: center;
}

.v-card-text strong {
  display: inline-block;
  width: 120px;
}
</style>
