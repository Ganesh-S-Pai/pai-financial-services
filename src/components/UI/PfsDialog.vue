<template>
    <v-dialog max-width="700" v-model="isActive" :persistent="persistent" @click:outside="handleCancel"
        @keydown.esc="handleCancel">
        <v-card>
            <slot name="header">
                <div class="relative flex justify-center items-center">
                    <v-card-title class="text-center my-3 ml-1">
                        {{ dialogTitle }}
                        <v-icon :disabled="loading" size="small" class="absolute float-right mt-1"
                            @click="emit('cancel')">
                            mdi-close
                        </v-icon>
                    </v-card-title>
                </div>
            </slot>

            <v-divider></v-divider>

            <v-card-text class="modal-content">
                <v-container class="flex justify-center" width="62" v-if="!!loading">
                    <v-progress-circular size="30" indeterminate color="#296ec6"></v-progress-circular>
                </v-container>

                <div class="scrollable-content" v-else>
                    <slot>
                        {{ dialogContent }}
                    </slot>
                </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="flex justify-center items-center">
                <slot name="actions">
                    <v-btn v-if="showSecondaryButton" variant="outlined" rounded="lg" class="text-none mr-1 my-2"
                        :color="secondaryButtonType" :disabled="disableSecondaryButton || loading"
                        @click="secondaryButtonAction ? emit('delete') : emit('cancel')">
                        {{ secondaryButtonTitle }}
                    </v-btn>

                    <v-btn variant="flat" rounded="lg" class="text-none ml-1 my-2" :color="primaryButtonType"
                        :disabled="disablePrimaryButton || loading" @click="emit('submit')">
                        {{ primaryButtonTitle }}
                    </v-btn>
                </slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
    /* Toggle show and hide of Modal */
    isOpen: {
        type: Boolean,
        required: true,
    },
    dialogTitle: {
        type: String,
        default: 'Dialog',
    },
    /* Pass string content for body of Modal if no custom template is being passed to default slot */
    dialogContent: {
        type: String,
        default: `Dialog Content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.`,
    },
    primaryButtonType: {
        type: String,
        default: 'primary',
        validator: (value: string) => ['primary', 'secondary', 'warning', 'info', 'error', 'success'].includes(value),
    },
    primaryButtonTitle: {
        type: String,
        default: 'Submit',
    },
    secondaryButtonType: {
        type: String,
        default: 'secondary',
        validator: (value: string) => ['primary', 'secondary', 'warning', 'info', 'error', 'success'].includes(value),
    },
    secondaryButtonTitle: {
        type: String,
        default: 'Cancel',
    },
    secondaryButtonAction: {
        type: Boolean,
        default: false
    },
    disablePrimaryButton: {
        type: Boolean,
        default: false,
    },
    disableSecondaryButton: {
        type: Boolean,
        default: false,
    },
    showSecondaryButton: {
        type: Boolean,
        default: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    /* control whether Modal can be closed with Esc, X button and click outside */
    persistent: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['cancel', 'delete', 'submit'])

const isActive = ref(false)

const handleCancel = () => {
    if (!props.persistent) emit('cancel')
}

watch(
    () => props.isOpen,
    () => {
        isActive.value = props.isOpen
    },
)
</script>

<style scoped>
.modal-content {
    overflow: hidden;
}

.scrollable-content {
    max-height: 100%;
    overflow-y: auto;
}
</style>