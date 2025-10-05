<script setup lang="ts">
import TopNavigation from './components/layout/TopNavigation.vue'
import PfsToast from './components/UI/PfsToast.vue';
</script>

<template>
  <v-app>
    <v-container>
      <TopNavigation />
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
    <PfsToast />
  </v-app>
</template>

<style scoped></style>
