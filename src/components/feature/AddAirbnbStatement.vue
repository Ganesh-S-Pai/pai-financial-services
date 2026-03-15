<template>
    <v-form v-model="isValid">
        <v-container class="pb-0">
            <v-row>
                <v-col cols="12" md="10" offset-md="1">
                    <v-row dense>
                        <v-col cols="6" md="6" offset="4">
                            <v-chip-group v-model="editableAirbnbStatement.transaction">
                                <v-chip :value="Transaction.Booking"> {{
                                    Transaction.Booking }} </v-chip>
                                <v-chip :value="Transaction.Expense"> {{
                                    Transaction.Expense }} </v-chip>
                            </v-chip-group>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select clearable label="Type" v-model="editableAirbnbStatement.type"
                                :items="selectedTransactionTypes" variant="solo-filled" autocomplete="off"
                                :rules="[required]" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-date-input v-if="editableAirbnbStatement.transaction === Transaction.Expense" clearable
                                prepend-icon="" label="Date" variant="solo-filled" autocomplete="off"
                                :model-value="editableAirbnbStatement.date_info.end" :error="dateError"
                                :error-messages="dateError ? ['Date is required'] : []"
                                @update:model-value="(date) => updateDate('single', [date])" />

                            <v-date-input v-else clearable prepend-icon="" label="Dates" multiple="range"
                                variant="solo-filled" autocomplete="off" :error="dateError"
                                :error-messages="dateError ? ['Dates are required'] : []"
                                @update:model-value="(date) => updateDate('range', date.map(d => d?.toString() || ''))" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field clearable v-model.number="editableAirbnbStatement.amount" type="number"
                                label="Amount" variant="solo-filled" autocomplete="off" :rules="[required]" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field clearable v-model="editableAirbnbStatement.remark" label="Remarks"
                                variant="solo-filled" autocomplete="off" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script setup lang="ts">
import { Transaction, transactionTypes, type StatementRequest } from '@/types/airbnb';
import { useFormUtils } from '@/utils/form';
import { computed, ref, watch, watchEffect } from 'vue';

const { required } = useFormUtils()

const emit = defineEmits<{
    update: [value: StatementRequest],
    valid: [value: boolean]
}>()

const isValid = ref(false)
const editableAirbnbStatement = ref<StatementRequest>({ transaction: Transaction.Booking, date_info: { type: "single", end: new Date().toDateString() } } as StatementRequest)
const dateError = ref(false)

const selectedTransactionTypes = computed(() => {
    const key = editableAirbnbStatement.value.transaction.toLowerCase() as keyof typeof transactionTypes;
    return Object.values(transactionTypes[key]);
})

const updateDate = (type: "single" | "range", value: string[] | undefined) => {
    if (!value || !value.length) return

    const setTime = (date: string) => {
        const end = new Date(date)
        end.setHours(11, 30, 0, 0)
        return end.toISOString()
    }

    if (type === "single") {
        const end = setTime(value?.[0] ?? '')

        editableAirbnbStatement.value.date_info = {
            type: "single",
            end
        }
    }
    else {
        const start = setTime(value?.[0] ?? '')
        const end = setTime(value?.[value.length - 1] ?? '')
        editableAirbnbStatement.value.date_info = {
            type: "range",
            start,
            end
        }
    }
}

watch(() => editableAirbnbStatement.value.transaction, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        editableAirbnbStatement.value.type = ''
        editableAirbnbStatement.value.date_info = { ...editableAirbnbStatement.value.date_info, start: undefined, end: '' }
    }
})

watch(editableAirbnbStatement, () => emit('update', editableAirbnbStatement.value), { deep: true })

watchEffect(() => {
    // Validate date field manually
    const dateInfo = editableAirbnbStatement.value.date_info
    if (editableAirbnbStatement.value.transaction === Transaction.Expense) {
        dateError.value = !dateInfo?.end
    } else {
        dateError.value = !dateInfo?.start || !dateInfo?.end
    }
    emit('valid', isValid.value && !dateError.value)
})
</script>