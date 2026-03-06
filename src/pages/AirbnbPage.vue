<template>
    <v-container>
        <PfsCard>
            <v-tabs v-model="tab" align-tabs="center" color="purple-darken-4">
                <v-tab :value="AirbnbTabs.Overview"> {{ AirbnbTabs[AirbnbTabs.Overview] }} </v-tab>
                <v-tab :value="AirbnbTabs.Statement"> {{ AirbnbTabs[AirbnbTabs.Statement] }} </v-tab>
            </v-tabs>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item :value="AirbnbTabs.Overview">
                    <AirbnbSummary :summary="summary" />
                </v-tabs-window-item>
                <v-tabs-window-item :value="AirbnbTabs.Statement">
                    <v-container>
                        <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="statement"
                            :items-length="totalItems" :loading="isLoading" item-value="name"
                            @update:options="loadData">

                            <template #top>
                                <v-toolbar flat>
                                    <v-toolbar-title>
                                        <v-icon color="medium-emphasis" icon="mdi-hanger" size="x-small" start />
                                        Airbnb
                                    </v-toolbar-title>

                                    <v-text-field v-model.trim="search" label="Search transaction, type or remark"
                                        placeholder="Search transaction, type or remark" variant="outlined"
                                        bg-color="white" density="compact" clearable hide-details single-line
                                        @keydown.enter="searchData" @click:clear="searchData">
                                        <template #append>
                                            <v-btn icon size="large" density="compact" variant="elevated"
                                                @click="searchData">
                                                <v-icon>mdi-magnify</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-text-field>

                                    <v-btn class="me-2 ml-4" prepend-icon="mdi-plus" rounded="lg" text="Add"
                                        color="primary" variant="elevated" border @click="() => { }" />
                                </v-toolbar>
                            </template>

                            <template #item.actions>
                                <v-btn color="warning" text="Edit" size="small" @click="() => { }" />
                            </template>
                        </v-data-table-server>
                    </v-container>
                </v-tabs-window-item>
            </v-tabs-window>
        </PfsCard>
    </v-container>
</template>

<script setup lang="ts">
import AirbnbSummary from '@/components/feature/AirbnbSummary.vue'
import PfsCard from '@/components/UI/PfsCard.vue'
import { useAirbnbService } from '@/services/airbnbService'
import { AirbnbTabs, type DateInfo, type Statement, type Summary } from '@/types/airbnb'
import type { TableHeader } from '@/types/common'
import { formatCurrency, snakeToTitle } from '@/utils/common'
import { useDateUtil } from '@/utils/date'
import { ref } from 'vue'

const { getAirbnbData } = useAirbnbService()
const { localeDateString } = useDateUtil()

const tab = ref(AirbnbTabs.Statement)
const isLoading = ref(false)
const statement = ref<Statement[]>([])
const summary = ref<Summary>()
const totalItems = ref(0)
const itemsPerPage = ref(10)
const headers = ref<TableHeader[]>([])
const search = ref('')
const oldSearch = ref('')

const searchData = () => {
    if (search.value !== oldSearch.value) {
        oldSearch.value = search.value
        loadData({ page: 1, itemsPerPage: itemsPerPage.value })
    }
}

const getStatementDate = (dateInfo: DateInfo) => {
    if (dateInfo.type === "range")
        return `${localeDateString(dateInfo.start)} - ${localeDateString(dateInfo.end)}`
    return localeDateString(dateInfo.end)
}

const loadHeaders = () => {
    headers.value = Object.keys(statement.value[0] || {})
        .filter((key) => !['id', 'date_info', 'created_at', 'created_user', 'updated_at', 'updated_user'].includes(key))
        .map((key) => ({
            title: snakeToTitle(key),
            sortable: false,
            key
        } as TableHeader)).concat({ title: 'Actions', key: 'actions', sortable: false } as TableHeader)
}

const loadData = async ({ page, itemsPerPage }: { page: number, itemsPerPage: number }) => {
    if (isLoading.value) return
    try {
        isLoading.value = true
        const data = await getAirbnbData(
            page,
            itemsPerPage,
            search.value
        )
        statement.value = data.items ? data.items.map((stmt: Statement) => ({ ...stmt, date: getStatementDate(stmt.date_info), amount: formatCurrency(stmt.amount) })) : []
        summary.value = data.summary
        totalItems.value = data.total

        if (!headers.value.length)
            loadHeaders()

        isLoading.value = false
    } catch {
        isLoading.value = false
    }
}

</script>