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
                            :items-length="totalItems" :loading="isLoading" :key="tableKey" item-value="name"
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
                                        color="primary" variant="elevated" :disabled="isLoading" border
                                        @click="addAirbnbStatement" />
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

        <PfsDialog :is-open="isAdding" dialogTitle="Add new statement" primaryButtonType="success"
            :disable-primary-button="!isAddStatementValid" @cancel="isAdding = false" @submit="handleCreate">
            <AddAirbnbStatement @valid="handleAddStatementValid" @update="handleCreateAirbnbStatement" />
        </PfsDialog>
    </v-container>
</template>

<script setup lang="ts">
import AddAirbnbStatement from '@/components/feature/AddAirbnbStatement.vue'
import AirbnbSummary from '@/components/feature/AirbnbSummary.vue'
import PfsCard from '@/components/UI/PfsCard.vue'
import PfsDialog from '@/components/UI/PfsDialog.vue'
import { useAirbnbService } from '@/services/airbnbService'
import { useAuthStore } from '@/stores/auth'
import { useCommonStore } from '@/stores/common'
import { AirbnbTabs, type DateInfo, type Statement, type StatementRequest, type Summary } from '@/types/airbnb'
import type { TableHeader } from '@/types/common'
import { formatCurrency, snakeToTitle } from '@/utils/common'
import { useDateUtil } from '@/utils/date'
import { ref } from 'vue'

const commonStore = useCommonStore()
const authStore = useAuthStore()
const { getAirbnbData, addStatement } = useAirbnbService()
const { localeDateString } = useDateUtil()

const tableKey = ref(0)
const tab = ref(AirbnbTabs.Statement)
const isLoading = ref(false)
const statement = ref<Statement[]>([])
const summary = ref<Summary>()
const totalItems = ref(0)
const itemsPerPage = ref(10)
const headers = ref<TableHeader[]>([])
const search = ref('')
const oldSearch = ref('')
const isAdding = ref(false)
const newAirbnbStatement = ref<StatementRequest | undefined>()
const isAddStatementValid = ref(false)

const handleAddStatementValid = (valid: boolean) => {
    isAddStatementValid.value = valid
}

const addAirbnbStatement = () => {
    isAdding.value = true
}

const handleCreateAirbnbStatement = (salesLog: StatementRequest) => {
    newAirbnbStatement.value = salesLog
}

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

const handleCreate = async () => {
    if (!newAirbnbStatement.value) return

    isLoading.value = true

    const createdDate = new Date()

    await addStatement({
        ...newAirbnbStatement.value,
        created_at: createdDate,
        updated_at: createdDate,
        created_user: authStore.userId,
        updated_user: authStore.userId ?? "0"
    })

    tableKey.value++

    commonStore.addToast({
        message: 'Airbnb statement created successfully!',
        color: 'success'
    });

    isAdding.value = false
    isLoading.value = false
}
</script>