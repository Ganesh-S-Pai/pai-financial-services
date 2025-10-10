<template>
  <v-container>
    <PfsCard :loading="isLoading">
      <v-container>
        <v-data-table v-if="!isLoading" :items="salesLog" :headers="headers" :search="search" :sort-by="sortBy">
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>
                <v-icon color="medium-emphasis" icon="mdi-hanger" size="x-small" start></v-icon>

                Stock on hand (Audit)
              </v-toolbar-title>

              <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
                bg-color="white" density="compact" hide-details single-line />

              <v-btn class="me-2 ml-2" prepend-icon="mdi-plus" rounded="lg" text="Add" color="primary"
                variant="elevated" border @click="addSalesLog" />
            </v-toolbar>
          </template>
          <template #item.difference="{ value }">
            <v-chip :border="`${getDifferenceColor(value)} thin opacity-25`" :color="getDifferenceColor(value)"
              :text="value" size="small"></v-chip>
          </template>
          <template #item.actions="{ item }">
            <v-btn v-if="isLastItem(item)" color="warning" text="Edit" size="small" @click="editSalesLog(item)" />
          </template>
        </v-data-table>
      </v-container>
    </PfsCard>

    <PfsDialog :is-open="isEditing" dialogTitle="Edit log" primaryButtonType="success" @cancel="isEditing = false"
      :disable-primary-button="disableSubmit()" @submit="handleUpdate">
      <EditSalesLog v-if="editableSalesLog" :salesLog="editableSalesLog" @valid="handleEditSalesValid"
        @update="handleUpdateSalesLog" />
    </PfsDialog>

    <PfsDialog :is-open="isAdding" dialogTitle="Add new log" primaryButtonType="success" @cancel="isAdding = false"
      :disable-primary-button="!isAddSalesLogValid" @submit="handleCreate">
      <AddSalesLog :allowed-dates="[allowedDate]" @valid="handleAddSalesValid" @update="handleCreateSalesLog" />
    </PfsDialog>
  </v-container>
</template>

<script setup lang="ts">
import AddSalesLog from '@/components/feature/AddSalesLog.vue'
import EditSalesLog from '@/components/feature/EditSalesLog.vue'
import PfsCard from '@/components/UI/PfsCard.vue'
import PfsDialog from '@/components/UI/PfsDialog.vue'
import { useSalesService, type SalesLog } from '@/services/salesService'
import { useCommonStore } from '@/stores/common'
import type { TableHeader } from '@/types/common'
import { onMounted, ref } from 'vue'
import type { SortItem } from 'vuetify/lib/components/VDataTable/composables/sort.mjs'

const { getSalesLog, updateSalesLog, createSalesLog } = useSalesService()
const commonStore = useCommonStore()

const sortBy = [{ key: 'created_at', order: 'desc' } as SortItem]

const salesLog = ref<SalesLog[]>([])
const headers = ref<TableHeader[]>([])
const search = ref('')
const isLoading = ref(false)
const isEditing = ref(false)
const editableSalesLog = ref<SalesLog | undefined>()
const isAdding = ref(false)
const newSalesLog = ref<SalesLog | undefined>()
const allowedDate = ref(new Date())
const isEditSalesLogValid = ref(false)
const isAddSalesLogValid = ref(false)

const disableSubmit = () => JSON.stringify(editableSalesLog.value) === JSON.stringify(salesLog.value.find(item => item.id === editableSalesLog.value?.id)) || !isEditSalesLogValid.value

const getDifferenceColor = (difference: number) => {
  if (difference > 0) return 'error'
  else if (difference < 0) return 'warning'
  else return 'success'
}

const handleEditSalesValid = (valid: boolean) => {
  isEditSalesLogValid.value = valid
}

const editSalesLog = (salesLog: SalesLog) => {
  editableSalesLog.value = JSON.parse(JSON.stringify(salesLog))
  isEditing.value = true
}

const handleUpdateSalesLog = (salesLog: SalesLog) => {
  editableSalesLog.value = salesLog
}

const handleUpdate = async () => {
  if (!editableSalesLog.value || disableSubmit()) return

  isLoading.value = true
  const date = new Date(`${editableSalesLog.value.date} 06:00:00 GMT+0530`)
  await updateSalesLog(editableSalesLog.value.id, {
    inward: +editableSalesLog.value.inward,
    outward: +editableSalesLog.value.outward,
    sales: +editableSalesLog.value.sales,
    date: date.toISOString()
  } as SalesLog)
  await loadSalesLogs()

  commonStore.addToast({
    message: 'Sales log updated successfully!',
    color: 'success'
  });
  isEditing.value = false
  isLoading.value = false
}

const handleAddSalesValid = (valid: boolean) => {
  isAddSalesLogValid.value = valid
}

const addSalesLog = () => {
  isAdding.value = true
}

const handleCreateSalesLog = (salesLog: SalesLog) => {
  newSalesLog.value = salesLog
}

const handleCreate = async () => {
  if (!newSalesLog.value) return

  isLoading.value = true
  const date = new Date(newSalesLog.value.date)
  date.setHours(11, 30, 0, 0);

  await createSalesLog({
    ...newSalesLog.value,
    inward: +newSalesLog.value.inward,
    outward: +newSalesLog.value.outward,
    sales: +newSalesLog.value.sales,
    system: +newSalesLog.value.system,
    date: date.toISOString()
  })
  await loadSalesLogs()

  commonStore.addToast({
    message: 'Sales log created successfully!',
    color: 'success'
  });
  isAdding.value = false
  isLoading.value = false
}

const loadSalesLogs = async () => {
  salesLog.value = (await getSalesLog()) || []

  const lastLog = salesLog.value[salesLog.value.length - 1]
  if (lastLog?.date) {
    const date = new Date(lastLog.date)
    date.setDate(date.getDate() + 1)
    allowedDate.value = date
  }
}

const isLastItem = (log: SalesLog) => {
  return salesLog.value[salesLog.value.length - 1]?.id === log.id
}

onMounted(async () => {
  isLoading.value = true
  await loadSalesLogs()

  headers.value = Object.keys(salesLog.value[0] || {})
    .filter((key) => !['id', 'created_at', 'updated_at'].includes(key))
    .map((key) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      value: key,
      key
    })).concat({ title: 'Actions', value: 'actions', key: 'actions' })
  isLoading.value = false
})
</script>

<style scoped></style>
