<template>
  <v-app-bar app dark color="purple-darken-4" class="flex justify-end">
    <v-app-bar-nav-icon v-if="isMobile" @click="commonStore.drawer = !commonStore.drawer" />

    <v-app-bar-title class="text-right mr-4">
      <strong> Pai Financial Services </strong>
    </v-app-bar-title>

    <template #append>
      <v-icon class="mr-16">mdi-finance</v-icon>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores/common';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const commonStore = useCommonStore()
const { mdAndDown } = useDisplay()

const isMobile = computed(() => mdAndDown.value)
</script>

<style scoped></style>
