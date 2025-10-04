<template>
  <v-navigation-drawer app v-model="commonStore.drawer" image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    :permanent="!isMobile">
    <v-list-item v-for="route in myRoutes" :key="route.path" :to="route.path" :title="route.name" base-color="white">
    </v-list-item>

    <template v-slot:append>
      <v-divider color="white" thickness="3" />
      <v-list-item dense base-color="white">
        <v-list-item-title>Settings</v-list-item-title>
        <template #prepend>
          <v-icon>mdi-cog</v-icon>
        </template>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { routes } from '@/router'
import { computed } from 'vue'
import { useDisplay } from 'vuetify/lib/composables/display'
import { useCommonStore } from '@/stores/common';

const commonStore = useCommonStore()
const { mdAndDown } = useDisplay()

const isMobile = computed(() => mdAndDown.value)
const myRoutes = Object.values(routes).filter((r) => !['Login', 'Register'].includes(r.name))
</script>

<style scoped></style>
