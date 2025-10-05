<template>
    <v-snackbar v-for="toast in toasts" :key="toast.id" v-model="toast.show" :timeout="toast.timeout"
        :color="toast.color" :top="toast.top" :bottom="toast.bottom" :left="toast.left" :right="toast.right">
        {{ toast.message }}
        <template v-slot:actions>
            <v-btn text @click="toast.show = false"> Close </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores/common';
import { computed } from 'vue';

const commonStore = useCommonStore();

const toasts = computed(() => commonStore.toasts);
</script>