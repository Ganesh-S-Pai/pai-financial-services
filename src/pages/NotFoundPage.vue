<template>
    <PfsCard class="d-flex flex-column align-center justify-center">
        <v-empty-state headline="Whoops, 404" title="Page not found" text="The page you are looking for does not exist"
            image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png">
            Please check the URL or return to the
            <router-link to="/">home page</router-link>.</v-empty-state>
    </PfsCard>
</template>

<script setup lang="ts">
import PfsCard from '@/components/UI/PfsCard.vue';

</script>