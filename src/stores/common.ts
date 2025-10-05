import type { ToastItem } from '@/components/UI/types/PfsToast.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
    const drawer = ref(false)

    const toasts = ref<ToastItem[]>([])

    const addToast = (toast: ToastItem): void => {
        toasts.value.push({
            ...toast,
            id: Date.now(),
            timeout: 3000,
            top: false,
            bottom: false,
            left: true,
            right: false,
            show: true,
        })

        // cleanup toasts after timeout
        setTimeout(() => {
            toasts.value = toasts.value.filter(t => t.id !== toast.id)
        }, 3000)
    }

    return { drawer, toasts, addToast }
})