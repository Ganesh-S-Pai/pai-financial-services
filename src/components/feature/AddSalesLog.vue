<template>
    <v-form v-model="isValid">
        <v-container class="pb-0">
            <v-row>
                <v-col cols="12" md="10" offset-md="1">
                    <v-row dense>
                        <v-col cols="12" md="6">
                            <v-date-input clearable v-model="editableSalesLog.date" label="Date"
                                prepend-icon="mdi-calendar-range" variant="solo-filled" :allowed-dates="allowedDates"
                                autocomplete="off" :rules="[required]" />
                        </v-col>

                        <v-col cols="12" md="6">
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <EditSalesLog v-if="editableSalesLog" :salesLog="editableSalesLog" @valid="handleEditSalesValid"
            @update="handleUpdateSalesLog" />
    </v-form>
</template>

<script setup lang="ts">
import type { SalesLog } from '@/services/salesService';
import { ref, watch, watchEffect } from 'vue';
import EditSalesLog from './EditSalesLog.vue';
import { useFormUtils } from '@/utils/form';
import { VDateInput } from 'vuetify/labs/VDateInput';

const { required } = useFormUtils()

const props = defineProps({
    allowedDates: {
        type: Array as () => Date[],
        required: true
    }
})

const emit = defineEmits<{
    update: [value: SalesLog],
    valid: [value: boolean]
}>()

const isValid = ref(false)
const editableSalesLog = ref<SalesLog>({ date: props.allowedDates[0]?.toString() ?? '' } as SalesLog)
const isEditSalesLogValid = ref(false)

const handleEditSalesValid = (valid: boolean) => {
    isEditSalesLogValid.value = valid
}

const handleUpdateSalesLog = (salesLog: SalesLog) => {
    editableSalesLog.value = salesLog
}

watch(editableSalesLog, () => emit('update', editableSalesLog.value), { deep: true })
watchEffect(() => emit('valid', isValid.value && isEditSalesLogValid.value))
</script>