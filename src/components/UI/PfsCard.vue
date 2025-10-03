<template>
    <v-card :title="title" :loading="loading" class="pfs-card-container">
        <div class="pfs-card">
            <slot />
        </div>
    </v-card>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: false,
        default: '',
    },
    loading: {
        type: Boolean,
        required: false,
        default: false,
    },
});
</script>

<style scoped></style>