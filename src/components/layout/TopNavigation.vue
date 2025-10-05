<template>
  <v-app-bar app dark color="purple-darken-4" class="flex justify-end">
    <v-app-bar-nav-icon v-if="showDrawer" @click="commonStore.drawer = !commonStore.drawer" />

    <v-app-bar-title class="text-right mr-4" @click="redirectToHome()">
      <strong> Pai Financial Services </strong>
    </v-app-bar-title>

    <template #append>
      <v-icon class="mr-16">mdi-finance</v-icon>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAuthentication } from '@/services/authService';
import { useCommonStore } from '@/stores/common';
import { useRedirect } from '@/utils/redirect';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const { isAuthenticated } = useAuthentication()
const commonStore = useCommonStore()
const { mdAndDown } = useDisplay()
const { redirectToHome } = useRedirect()

const isMobile = computed(() => mdAndDown.value)
const showDrawer = computed(() => isMobile.value && isAuthenticated.value)
</script>

<style scoped></style>
