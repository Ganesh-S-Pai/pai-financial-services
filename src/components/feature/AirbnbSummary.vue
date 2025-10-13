<script setup lang="ts">
import { AirbnbPanels, type Summary } from '@/types/airbnb';
import { formatCurrency } from '@/utils/common';
import { ref } from 'vue';

defineProps({
    summary: {
        type: Object as () => Summary,
        required: false
    }
})

const panel = ref(AirbnbPanels.Total)

</script>

<template>
    <v-container class="mb-4">
        <v-empty-state v-if="!summary" headline="Whoops, Summary 404" title="Men at work"
            text="The summary you are looking for is still on the way..." />

        <v-expansion-panels v-else v-model="panel" variant="accordion">
            <v-expansion-panel :value="AirbnbPanels.Total">
                <v-expansion-panel-title :class="{ 'bg-grey-lighten-3': panel === AirbnbPanels.Total }">
                    <v-icon color="medium-emphasis" icon="mdi-currency-rupee" size="small" start />
                    Total
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-table>
                        <tbody>
                            <tr>
                                <td>Total</td>
                                <td>{{ formatCurrency(summary?.net_balance) }}</td>
                            </tr>
                            <tr>
                                <td>Bookings</td>
                                <td>{{ formatCurrency(summary?.bookings.total) }}</td>
                            </tr>
                            <tr>
                                <td>Expenses</td>
                                <td>{{ formatCurrency(summary?.expenses.total) }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel :value="AirbnbPanels.Bookings">
                <v-expansion-panel-title :class="{ 'bg-grey-lighten-3': panel === AirbnbPanels.Bookings }">
                    <v-icon color="medium-emphasis" icon="mdi-finance" size="small" start />
                    Bookings
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-table>
                        <tbody>
                            <tr>
                                <td>Airbnb</td>
                                <td>{{ formatCurrency(summary?.bookings.airbnb_total) }}</td>
                            </tr>
                            <tr>
                                <td>Direct</td>
                                <td>{{ formatCurrency(summary?.bookings.direct_total) }}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>{{ formatCurrency(summary?.bookings.total) }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel :value="AirbnbPanels.Expenses">
                <v-expansion-panel-title :class="{ 'bg-grey-lighten-3': panel === AirbnbPanels.Expenses }">
                    <v-icon color="medium-emphasis" icon="mdi-stairs-down" size="small" start />
                    Expenses
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-table>
                        <tbody>
                            <tr>
                                <td>Rent</td>
                                <td>{{ formatCurrency(summary?.expenses.rent) }}</td>
                            </tr>
                            <tr>
                                <td>Electricity</td>
                                <td>{{ formatCurrency(summary?.expenses.electricity) }}</td>
                            </tr>
                            <tr>
                                <td>Water</td>
                                <td>{{ formatCurrency(summary?.expenses.water) }}</td>
                            </tr>
                            <tr>
                                <td>Internet</td>
                                <td>{{ formatCurrency(summary?.expenses.internet) }}</td>
                            </tr>
                            <tr>
                                <td>House keeping</td>
                                <td>{{ formatCurrency(summary?.expenses.house_keeping) }}</td>
                            </tr>
                            <tr>
                                <td>Miscellaneous</td>
                                <td>{{ formatCurrency(summary?.expenses.miscellaneous) }}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>{{ formatCurrency(summary?.expenses.total) }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>