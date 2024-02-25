<script setup lang="ts"></script>

<template>
    <div class="max-w-[1280px] mx-auto flex gap-5 py-10 px-8">
        <div class="flex-1">
            <router-views />
        </div>
        <div class="w-[300px] pl-5">
            <!-- <t-affix ref="affix" :offset-top="100" class="w-full"> -->
            <t-list header="推荐作者" size="small">
                <t-list-item v-for="v in 6" :key="v">
                    <avatar />
                    <template #action>
                        <t-button size="small">
                            <template #icon>
                                <t-icon name="add" />
                            </template>
                            关注
                        </t-button>
                    </template>
                </t-list-item>
            </t-list>
            <!-- </t-affix> -->
        </div>
    </div>
</template>

<style scoped></style>
