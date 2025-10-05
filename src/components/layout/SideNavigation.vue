<template>
  <v-navigation-drawer app v-model="commonStore.drawer" image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    :permanent="!isMobile">
    <v-list-item v-for="route in myRoutes" :key="route.path" :to="route.path" :title="route.name as string"
      base-color="white">
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
import { useCommonStore } from '@/stores/common'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const routes = useRouter().getRoutes()

const commonStore = useCommonStore()
const { mdAndDown } = useDisplay()

const isMobile = computed(() => mdAndDown.value)
const myRoutes = Object.values(routes).filter((r) => !['Login', 'Register', 'Not Found'].includes(r.name as string))
</script>

<style scoped></style>
