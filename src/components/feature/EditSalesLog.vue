<template>
    <v-form v-model="isValid">
        <v-container>
            <v-row>
                <v-col cols="12" md="10" offset-md="1">
                    <v-row dense>
                        <v-col cols="12" md="6">
                            <v-text-field clearable v-model.number="editableLog.inward" type="number" label="Inward"
                                prepend-icon="mdi-arrow-down-bold-outline" variant="solo-filled" autocomplete="off"
                                :rules="[required]" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field clearable v-model.number="editableLog.outward" type="number" label="Outward"
                                prepend-icon="mdi-arrow-up-bold-outline" variant="solo-filled" autocomplete="off"
                                :rules="[required]" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field clearable v-model.number="editableLog.sales" type="number" label="Sales"
                                prepend-icon="mdi-sale" variant="solo-filled" autocomplete="off" :rules="[required]" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script setup lang="ts">
import type { SalesLog } from '@/services/salesService';
import { useFormUtils } from '@/utils/form';
import { ref, watch } from 'vue';

const { required } = useFormUtils()

const props = defineProps({
    salesLog: {
        type: Object as () => SalesLog,
        required: true
    }
})

const emit = defineEmits<{
    update: [value: SalesLog],
    valid: [value: boolean]
}>()

const isValid = ref(false)
const editableLog = ref<SalesLog>(props.salesLog)

watch(editableLog, () => emit('update', editableLog.value), { deep: true })
watch(isValid, () => emit('valid', isValid.value))
</script>