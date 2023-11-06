<script setup lang="ts">
// import Button from '../ui/button/index.vue'
// import ToolTip from '../ui/tooltip/index.vue'
import Icon, { type IconName, IconMap } from '../ui/icon'
import { Items, ItemType } from '../../config'
import type { EngineInterface } from '@aomao/engine'
import { onMounted, ref } from 'vue'

interface ToolBarProps {
    engine: EngineInterface
}

const props = defineProps<ToolBarProps>()

const actives = ref<string[]>([])
onMounted(() => {
    if (!props.engine) return

    props.engine.on('select', () => {
        actives.value.splice(0)

        Items.forEach((items) =>
            items.forEach((v) => {
                switch (v.type) {
                    case ItemType.BUTTON:
                        if (props.engine.command.queryState(v.name)) {
                            actives.value.push(v.name)
                        }
                        break
                    case ItemType.SELECT:
                        if (props.engine.command.queryState(v.name)) {
                            // actives.value.push(v.name)
                        }
                        break
                    default:
                        break
                }
            })
        )
    })
})
</script>

<template>
    <div class="flex w-full justify-start gap-1">
        <!-- <ToolTip :title="v.title" v-for="v in Items" :key="v.title">
            <Button :active="actives.includes(v.name)" @click="v.command(engine)">
                <Icon :name="v.name" />
            </Button>
        </ToolTip> -->
        <div v-for="(item, index) in Items" :key="index" class="flex items-center">
            <t-tooltip v-for="v in item" :key="v.title" :content="v.title" placement="bottom">
                <t-button
                    :variant="actives.includes(v.name) ? 'base' : 'text'"
                    :class="actives.includes(v.name) && 'btn'"
                    style="padding: 0 8px; border-radius: 4px"
                    @click="v.command(engine)"
                    v-if="v.type === ItemType.BUTTON"
                >
                    <template #icon>
                        <Icon :name="v.name as IconName" />
                    </template>
                </t-button>

                <div v-else-if="v.type === ItemType.SELECT" class="mx-1">
                    <t-select
                        style="width: 120px"
                        :defaultValue="v.defaultValue"
                        :onChange="(val: string) => v.command(engine, val)"
                    >
                        <t-option
                            v-for="s in v.options"
                            :key="s.name"
                            :label="s.name"
                            :value="s.value"
                        />
                    </t-select>
                </div>
            </t-tooltip>
            <t-divider
                layout="vertical"
                v-if="index < Items.length - 1"
                :style="{ height: '30px' }"
            ></t-divider>
        </div>
    </div>
</template>

<style scoped lang="scss">
.btn {
    background: #dbeafe;
    color: #4096ff;
    border-color: rgba(0, 0, 0, 0);

    &:hover {
        background: #dbeafe;
        border-color: rgba(0, 0, 0, 0);
    }
}
</style>
