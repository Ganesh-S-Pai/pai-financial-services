<template>
    <v-container>
        <PfsCard :loading="isLoading">
            <v-container>
                <v-data-table v-if="!isLoading" :items="users" :headers="headers" :search="search"
                    @click:row="handleRowClick">
                    <template #top>
                        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify"
                            variant="outlined" hide-details single-line>
                        </v-text-field>
                    </template>

                    <template #item.actions="{ item }">
                        <div class="d-flex ga-4">
                            <v-icon color="warning" icon="mdi-pencil" size="large" @click.stop="editUser(item)"></v-icon>

                            <v-icon color="error" icon="mdi-delete" size="large" @click.stop="delUser(item)"></v-icon>
                        </div>
                    </template>
                </v-data-table>
            </v-container>
        </PfsCard>

        <PfsDialog :is-open="isEditing" dialogTitle="Edit user" primaryButtonType="success" @cancel="isEditing = false"
            @submit="handleUpdate">
            <EditUser v-if="editableUser" :user="editableUser" @update="handleUpdateUser" />
        </PfsDialog>

        <PfsDialog :is-open="isDeleting" dialogTitle="Delete user" primaryButtonType="error" primaryButtonTitle="Delete"
            secondaryButtonType="warning" @cancel="isDeleting = false"
            :dialogContent="`Are you sure you want to delete ${deletableUser?.first_name} ${deletableUser?.last_name}?`"
            @submit="handleDelete" />
    </v-container>
</template>

<script setup lang="ts">
import EditUser from '@/components/feature/EditUser.vue';
import PfsCard from '@/components/UI/PfsCard.vue';
import PfsDialog from '@/components/UI/PfsDialog.vue';
import { useUsers } from '@/services/userService';
import { useAuthStore } from '@/stores/auth';
import { useCommonStore } from '@/stores/common';
import type { User } from '@/types/auth';
import type { TableHeader } from '@/types/common';
import { useDateUtil } from '@/utils/date';
import { useRedirect } from '@/utils/redirect';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore()
const commonStore = useCommonStore()
const { redirect } = useRedirect()
const { getUsers, updateUser, deleteUser } = useUsers()
const { localeDateString } = useDateUtil()

const users = ref<User[]>([])
const headers = ref<TableHeader[]>([])
const search = ref('')
const isLoading = ref(true)
const isEditing = ref(false)
const isDeleting = ref(false)
const editableUser = ref<User | undefined>()
const deletableUser = ref<User | undefined>()

const editUser = (user: User) => {
    editableUser.value = JSON.parse(JSON.stringify(user))
    isEditing.value = true
}

const delUser = (user: User) => {
    deletableUser.value = user
    isDeleting.value = true
}

const handleUpdateUser = (updUser: User) => {
    editableUser.value = updUser
}

const handleUpdate = async () => {
    if (!editableUser.value) return

    isLoading.value = true
    await updateUser({
        ...editableUser.value,
        dob: new Date(editableUser.value.dob).toISOString()
    })
    await loadUsers()

    commonStore.addToast({
        message: 'User updated successfully!',
        color: 'success'
    });
    isEditing.value = false
    isLoading.value = false
}

const handleDelete = async () => {
    if (!deletableUser.value) return

    if (deletableUser.value.id === authStore.userId) {
        commonStore.addToast({
            message: 'You cannot delete yourself, dumbass!',
            color: 'error'
        });
        return
    }

    isLoading.value = true
    await deleteUser(deletableUser.value.id)
    await loadUsers()

    commonStore.addToast({
        message: 'User deleted successfully!',
        color: 'success'
    });
    isDeleting.value = false
    isLoading.value = false
}

const handleRowClick = (_event: Event, row: { item: User }) => {
    redirect(`/profile?id=${row.item.id}`)
}

const loadUsers = async () => {
    const userData = await getUsers()
    users.value = userData.map((user: User) => ({
        ...user,
        dob: localeDateString(user.dob),
        created_at: new Date(user.created_at ?? '').toLocaleString(),
        updated_at: new Date(user.updated_at ?? '').toLocaleString()
    }))
}

const loadHeaders = () => {
    headers.value = Object.keys(users.value[0] || {})
        .filter((key) => !['id'].includes(key))
        .map((key) => ({
            title: key.charAt(0).toUpperCase() + key.slice(1),
            value: key,
            key
        })).concat({ title: 'Actions', value: 'actions', key: 'actions' })
}

onMounted(async () => {
    isLoading.value = true
    await loadUsers()
    loadHeaders()
    isLoading.value = false
})
</script>