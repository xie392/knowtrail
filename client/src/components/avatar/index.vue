<script setup lang="ts">
interface AvatarProps {
    url?: string
    name?: string
    trigger?: 'hover' | 'click'
}

const props = withDefaults(defineProps<AvatarProps>(), {
    url: 'https://picsum.photos/40',
    name: 'jakes',
    trigger: 'hover'
})
</script>

<template>
    <div class="flex gap-2 items-center">
        <t-popup :trigger="props.trigger" showArrow class="flex gap-2 items-center">
            <t-avatar :image="props.url" size="small" class="cursor-pointer" />
            <template #content>
                <div class="flex gap-2 items-center w-[200px] p-3">
                    <t-avatar :image="props.url" size="large" class="cursor-pointer" />
                    <div>11111111</div>
                </div>
            </template>
        </t-popup>
        <router-link to="/" class="text-[0.875rem hover:text-main"> {{ props.name }}</router-link>
    </div>
</template>

<style scoped></style>
