import { MonthFormat } from "@/types/common"
import { computed } from "vue"

export const useDateUtil = () => {
    const yesterday = computed(() => {
        const today = new Date()
        today.setDate(today.getDate() - 1)
        return today.toISOString().split('T')[0]
    })

    const age = (birthDate: Date | string) => {
        const today = new Date()
        const dob = new Date(birthDate)

        return today.getFullYear() -
            dob.getFullYear() -
            (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0)
    }

    const localeDateString = (dateString?: string | Date, monthFormat: MonthFormat.LONG | MonthFormat.SHORT = MonthFormat.SHORT): string => {
        const date = dateString ? new Date(dateString) : new Date()

        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: monthFormat,
            year: 'numeric',
        })
    }

    return { yesterday, age, localeDateString }
}