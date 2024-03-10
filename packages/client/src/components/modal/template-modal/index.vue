<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ visible: boolean }>()
const emits = defineEmits(['update:visible'])
const visible = computed({
    get() {
        return props.visible
    },
    set(value) {
        emits('update:visible', value)
    }
})
</script>

<template>
    <div>
        <t-dialog
            closeBtn
            :closeOnEscKeydown="false"
            :footer="false"
            header
            preventScrollThrough
            v-model:visible="visible"
        >
            <p>This is a dialog</p>
        </t-dialog>
    </div>
</template>

<style scoped></style>
