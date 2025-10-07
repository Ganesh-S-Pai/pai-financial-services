<template>
  <div class="application-wrapper">
    <SideNavigation />
    <router-view v-slot="{ Component }">
      <transition mode="out-in" enter-active-class="transition-opacity duration-1000" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-1000"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import SideNavigation from '@/components/layout/SideNavigation.vue';
</script>

<style scoped></style>
