import { MonthFormat } from "@/types/common"
import { computed } from "vue"

export const useDateUtil = () => {
    const yesterday = computed(() => {
        const today = new Date()
        today.setDate(today.getDate() - 1)
        return today.toISOString().split('T')[0]
    })

    const age = (dateOfBirth: Date | string) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
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