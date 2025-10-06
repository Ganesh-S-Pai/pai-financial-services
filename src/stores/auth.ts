import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
    'useAuth',
    () => {
        const userId = ref<string>()
        const token = ref<string>()

        return { userId, token }
    },
    {
        persist: true
    } as any
    // NOTE persist option is passed with type any as Typescript was throwing error due to defineStore not defining persist as a valid property
)
