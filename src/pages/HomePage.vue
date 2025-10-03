<template>
    <PfsCard title="PFS" height="200" class="d-flex flex-column align-center justify-center">
        <h1>You did it!</h1>
        <p>
            Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
            documentation
        </p>
        <router-link to="/register">Go to Register Page</router-link>
        <router-link to="/login">Go to Login Page</router-link>
    </PfsCard>
</template>

<script setup lang="ts">
import PfsCard from '@/components/UI/PfsCard.vue';

</script>

<style scoped></style>