<script setup lang="ts">
import { ref } from 'vue'

const visible = ref<boolean>(false)
</script>

<template>
    <div>
        <t-button shape="circle" theme="default" variant="text" @click="visible = true">
            <template #icon>
                <t-badge count="0" dot>
                    <t-icon name="notification-filled" />
                </t-badge>
            </template>
        </t-button>
        <t-dialog
            :closeOnEscKeydown="false"
            :closeOnOverlayClick="false"
            :footer="false"
            :header="false"
            showOverlay
            v-model:visible="visible"
        >
            <p>This is a dialog</p>
        </t-dialog>
    </div>
</template>

<style scoped></style>
