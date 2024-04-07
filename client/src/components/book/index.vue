<script setup lang="ts">
import { faker } from '@faker-js/faker'

interface BookProps {
    footer?: boolean
}

const props = withDefaults(defineProps<BookProps>(), {
    footer: true
})
</script>

<template>
    <div
        class="py-2 pb-3 px-3 min-w-[200px] border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg transition-all transition-linear duration-400"
    >
        <div>
            <img
                :src="faker.image.url()"
                alt=""
                srcset=""
                class="w-full h-[150px] object-cover rounded-lg"
            />
        </div>
        <h2 class="text-[1rem] font-semibold mt-3 mb-1 line-clamp-1">
            {{ faker.lorem.sentence() }}
        </h2>
        <p class="text-[0.85rem] line-clamp-2">
            {{ faker.lorem.paragraph() }}
        </p>
        <div class="mt-3 flex justify-between items-center" v-if="props.footer">
            <avatar />
            <span class="text-[0.75rem] text-gray-400">{{ faker.date.anytime() }}</span>
        </div>
    </div>
</template>

<style scoped></style>
