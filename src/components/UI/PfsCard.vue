<template>
  <v-card :title="title" :loading="loading" class="pfs-card-container h-full">
    <div class="pfs-card" v-if="!loading">
      <slot />
    </div>
    <div v-else class="d-flex flex-column align-center justify-center mt-16">
      <v-progress-circular indeterminate class="p-4 m-6" color="primary" size="48" />
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
})
</script>

<style scoped></style>
