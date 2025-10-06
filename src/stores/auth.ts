import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const userId = ref<string>()
    const token = ref<string>()

    return { userId, token }
}, { persist: true })