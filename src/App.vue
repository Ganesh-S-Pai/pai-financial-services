<script setup lang="ts">
import SideNavigation from './components/layout/SideNavigation.vue'
import TopNavigation from './components/layout/TopNavigation.vue'
</script>

<template>
  <v-app>
    <v-container>
      <TopNavigation />
      <SideNavigation />
      <v-main>
        <router-view v-slot="{ Component }">
          <transition mode="out-in" enter-active-class="transition-opacity duration-1000" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-1000"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-main>
    </v-container>
  </v-app>
</template>

<style scoped></style>
