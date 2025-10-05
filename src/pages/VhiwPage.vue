<template>
  <PfsCard :loading="loading">
    <v-container>
      <v-data-table v-if="!loading" :items="salesLog" :headers="headers" :search="search" :sort-by="sortBy"
        class="data-table">
        <template #top>
          <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
            single-line>
          </v-text-field>
        </template>
      </v-data-table>
    </v-container>
  </PfsCard>
</template>

<script setup lang="ts">
import PfsCard from '@/components/UI/PfsCard.vue'
import { useSalesService, type SalesLog } from '@/services/salesService'
import type { TableHeader } from '@/types/common'
import { onMounted, ref } from 'vue'
import type { SortItem } from 'vuetify/lib/components/VDataTable/composables/sort.mjs'

const salesLog = ref<SalesLog[]>([])
const headers = ref<TableHeader[]>([])
const search = ref('')
const sortBy = ref([{ key: 'date', order: 'asc' } as SortItem])
const loading = ref(false)

onMounted(async () => {
  loading.value = true

  const { getSalesLog } = useSalesService()
  salesLog.value = await getSalesLog()

  headers.value = Object.keys(salesLog.value[0] || {})
    .filter((key) => key !== 'id')
    .map((key) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      value: key,
    }))
  loading.value = false
})
</script>

<style scoped>
.data-table {
  border: solid 1px #ccc;
}
</style>
