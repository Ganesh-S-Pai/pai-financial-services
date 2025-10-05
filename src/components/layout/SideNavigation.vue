<template>
  <v-navigation-drawer app v-model="showDrawer" image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    :permanent="!isMobile">

    <v-list-item dense base-color="white" title="Van Heusen" prepend-icon="mdi-tshirt-crew" class="mt-2" to="/vhiw"></v-list-item>
    <v-list-item dense base-color="white" title="Malt House" prepend-icon="mdi-taxi" to="/malt"></v-list-item>

    <template v-slot:append>
      <v-divider color="white" thickness="3" />
      <v-expand-transition>
        <div v-if="toggleSettings">
          <v-list-item dense base-color="white" title="Profile" prepend-icon="mdi-account" to="/profile"></v-list-item>
          <v-list-item dense base-color="white" title="Logout" prepend-icon="mdi-logout"
            @click="handleLogout"></v-list-item>
        </div>
      </v-expand-transition>
      <v-list-item dense base-color="white" title="Settings" prepend-icon="mdi-cog" class="mb-2"
        @click="toggleSettings = !toggleSettings"></v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAuthentication } from '@/services/authService'
import { useCommonStore } from '@/stores/common'
import { useRedirect } from '@/utils/redirect'
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'

const commonStore = useCommonStore()
const { mdAndDown } = useDisplay()
const { logoutUser } = useAuthentication()
const { redirect } = useRedirect()

const toggleSettings = ref(false)

const isMobile = computed(() => mdAndDown.value)
const showDrawer = computed(() => isMobile.value ? commonStore.drawer : true)

const handleLogout = () => {
  logoutUser()
  commonStore.addToast({
    message: 'Logged out successfully',
    color: 'success'
  })
  redirect('/login')
}
</script>

<style scoped></style>
