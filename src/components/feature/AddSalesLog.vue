<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" md="10" offset-md="1">
                    <v-row dense>
                        <v-col cols="12" md="6">
                            <v-date-input clearable v-model="editableSalesLog.date" label="Date"
                                prepend-icon="mdi-calendar-range" variant="solo-filled" :max="today"
                                autocomplete="off" :rules="[required]" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field clearable v-model="editableSalesLog.opening" type="number" label="Opening "
                                prepend-icon="mdi-open-in-app" variant="solo-filled" autocomplete="off"
                                :rules="[required]" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <EditSalesLog v-if="editableSalesLog" :salesLog="editableSalesLog" @update="handleUpdateSalesLog" />
    </v-form>
</template>

<script setup lang="ts">
import type { SalesLog } from '@/services/salesService';
import { ref, watch } from 'vue';
import EditSalesLog from './EditSalesLog.vue';
import { useFormUtils } from '@/utils/form';
import { VDateInput } from 'vuetify/labs/VDateInput';

const { required } = useFormUtils()

const today = new Date().toISOString()

const emit = defineEmits<{
    update: [value: SalesLog]
}>()

const editableSalesLog = ref<SalesLog>({} as SalesLog)

const handleUpdateSalesLog = (salesLog: SalesLog) => {
    editableSalesLog.value = salesLog
}

watch(editableSalesLog, () => emit('update', editableSalesLog.value), { deep: true })
</script>