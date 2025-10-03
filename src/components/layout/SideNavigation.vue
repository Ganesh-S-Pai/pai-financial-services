<template>
    <div class="side-navigation-wrapper">
        <v-navigation-drawer image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" permanent>
            <v-list-item v-for="route in myRoutes" :key="route.path" :to="route.path" :title="route.name"
                base-color="white"> </v-list-item>
        </v-navigation-drawer>
    </div>
</template>

<script setup lang="ts">
import { routes } from '@/router';

const myRoutes = Object.values(routes); 
</script>

<style scoped></style>