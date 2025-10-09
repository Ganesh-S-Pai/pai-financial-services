<template>
  <v-container class="pa-4" fluid>
    <PfsCard class="mx-auto my-8" :loading="isLoading">
      <v-card-title>
        <v-icon class="mr-2">mdi-account-circle</v-icon>
        <span class="text-h6 font-weight-bold">{{ isMyProfile ? 'My' : 'User' }} Profile</span>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="6">
            <strong>First Name:</strong> {{ user?.first_name }}
          </v-col>
          <v-col cols="12" sm="6">
            <strong>Last Name:</strong> {{ user?.last_name }}
          </v-col>

          <v-col cols="12" sm="6">
            <strong>Email:</strong> {{ user?.email }}
          </v-col>

          <v-col cols="12" sm="6">
            <strong>Phone:</strong> {{ user?.phone }}
          </v-col>

          <v-col cols="12" sm="6">
            <strong>Date of Birth:</strong> {{ formattedDOB }}
          </v-col>

          <v-col cols="12" sm="6">
            <strong>Gender:</strong> {{ user?.gender }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions v-if="user">
        <v-btn color="primary" @click="editProfile">
          <v-icon left>mdi-pencil</v-icon> Edit Profile
        </v-btn>
      </v-card-actions>
    </PfsCard>

    <PfsDialog :is-open="isEditing" :dialogTitle="`Edit ${isMyProfile ? 'my' : 'user'} profile`"
      primaryButtonType="success" :disable-primary-button="disableSubmit()" @cancel="isEditing = false"
      @submit="handleSubmit">
      <EditUser v-if="editableUser" :user="editableUser" @valid="handleEditValid" @update="handleUpdateUser" />
    </PfsDialog>
  </v-container>
</template>

<script setup lang="ts">
import EditUser from '@/components/feature/EditUser.vue'
import PfsCard from '@/components/UI/PfsCard.vue'
import PfsDialog from '@/components/UI/PfsDialog.vue'
import { useUsers } from '@/services/userService'
import type { User } from '@/types/auth'
import { useDateUtil } from '@/utils/date'
import { ref, computed, onMounted } from 'vue'
import { MonthFormat } from '../types/common'
import { useCommonStore } from '@/stores/common'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const commonStore = useCommonStore()
const authStore = useAuthStore()
const route = useRoute()
const { getUser, updateUser } = useUsers()
const { localeDateString } = useDateUtil()

const user = ref<User | undefined>()
const editableUser = ref<User | undefined>()
const isLoading = ref(true)
const isEditing = ref(false)
const isEditUserValid = ref(false)
const queryId = route.query.id?.toString()

const formattedDOB = computed(() => {
  if (!user.value) return

  return localeDateString(user.value.dob, MonthFormat.LONG)
})

const isMyProfile = computed(() => queryId ? queryId === authStore.userId : true)

const disableSubmit = () => JSON.stringify(editableUser.value) === JSON.stringify(user.value) || !isEditUserValid.value

const handleEditValid = (valid: boolean) => {
  isEditUserValid.value = valid
}

const editProfile = async () => {
  editableUser.value = JSON.parse(JSON.stringify(user.value))
  isEditing.value = true
}

const handleUpdateUser = (updUser: User) => {
  editableUser.value = { ...updUser, phone: updUser.phone?.toString() }
}

const handleSubmit = async () => {
  if (!editableUser.value || disableSubmit()) return

  isLoading.value = true
  user.value = await updateUser(editableUser.value)
  await loadData()

  commonStore.addToast({
    message: 'Profile updated successfully!',
    color: 'success'
  })
  isEditing.value = false
}

const loadData = async () => {
  isLoading.value = true
  user.value = queryId ? await getUser(queryId) : await getUser()
  editableUser.value = JSON.parse(JSON.stringify(user.value))
  isLoading.value = false
}

onMounted(async () => {
  await loadData()
})
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
