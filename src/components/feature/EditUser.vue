<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" md="10" offset-md="1">
                    <v-row dense>
                        <v-col cols="12" md="6">
                            <v-text-field clearable v-model="updateUser.first_name" type="text" label="First Name"
                                prepend-icon="mdi-card-account-details" variant="solo-filled" autocomplete="off"
                                :rules="[required]" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field clearable v-model="updateUser.last_name" type="text" label="Last Name"
                                prepend-icon="mdi-card-account-details-outline" variant="solo-filled" autocomplete="off"
                                :rules="[required]" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field clearable v-model="updateUser.phone" type="number" label="Phone"
                                prepend-icon="mdi-phone" variant="solo-filled" :maxlength="10" autocomplete="off"
                                :rules="[required]" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select clearable label="Gender" v-model="updateUser.gender"
                                :items="['Male', 'Female', 'Other', 'Prefer not to say']"
                                prepend-icon="mdi-gender-male-female" variant="solo-filled" autocomplete="off"
                                :rules="[required]" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-date-input clearable v-model="updateUser.dob" label="Date of birth"
                                prepend-icon="mdi-calendar-range" variant="solo-filled" :max="yesterday"
                                autocomplete="off" :rules="[required]" />
                        </v-col>

                        <v-col cols="12" md="6" v-if="user.dob">
                            <v-text-field readonly label="Age" prepend-icon="mdi-account" variant="solo-filled"
                                :model-value="`${age(user.dob)} year(s) old`" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script setup lang="ts">
import type { User } from '@/types/auth';
import { useDateUtil } from '@/utils/date';
import { useFormUtils } from '@/utils/form';
import { ref, watch } from 'vue';
import { VDateInput } from 'vuetify/labs/VDateInput';

const { required } = useFormUtils()
const { yesterday, age } = useDateUtil()

const props = defineProps({
    user: {
        type: Object as () => User,
        required: true
    }
})

const emit = defineEmits<{
    update: [value: User]
}>()

const updateUser = ref<User>(props.user)

watch(updateUser, () => emit('update', updateUser.value), { deep: true })
</script>