<template>
    <PfsCard>
        <div v-if="isLoading" class="d-flex flex-column align-center mt-16 mb-16">
            <v-progress-circular size="70" width="7" color="purple-darken-4" indeterminate />
        </div>

        <div class="d-flex flex-column align-center">
            <iframe :src="link" width="750" height="1950" frameborder="0" scrolling="no" @load="onIframeLoad"></iframe>
        </div>
    </PfsCard>
</template>

<script setup lang="ts">
import PfsCard from '@/components/UI/PfsCard.vue'
import { ref } from 'vue'

const link = import.meta.env.VITE_RESUME_URL
const isLoading = ref(true)

const onIframeLoad = () => {
    isLoading.value = false
}
</script>
