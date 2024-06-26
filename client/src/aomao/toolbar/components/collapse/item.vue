<template>
    <!--  :overlayClassName="prompt ? '' : 'prompt-popover-hide'" -->
    <t-popconfirm
        :placement="placement || 'right'"
        :content="typeof prompt === 'function' ? prompt() : prompt"
        :class="prompt ? '' : 'prompt-popover-hide'"
    >
        <div
            :class="[
                'toolbar-collapse-item',
                { 'toolbar-collapse-item-active': active },
                { 'toolbar-collapse-item-disabled': disabled },
                className
            ]"
            @mouseenter="triggerMouseEnter"
            @mouseleave="triggerMouseLeave"
            @click="handleClick"
            @mousedown="handleMouseDown"
        >
            <slot name="icon">
                <span v-if="iconIsHtml" v-html="icon"></span>
                <span v-if="!iconIsHtml && icon" :class="`data-icon data-icon-${icon}`" />
            </slot>
            <div v-if="title" class="toolbar-collapse-item-text">
                <div class="toolbar-collapse-item-title">
                    {{ title }}
                </div>
                <div v-if="description" class="toolbar-collapse-item-description">
                    {{ typeof description === 'function' ? description() : description }}
                </div>
            </div>
        </div>
    </t-popconfirm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { collapseItemProps } from '../../types'

export default defineComponent({
    name: 'am-collapse-item',
    props: collapseItemProps,
    setup(props) {
        const active = ref(false)
        const handleMouseDown = (event: MouseEvent) => {
            event.preventDefault()
            if (props.onMouseDown) props.onMouseDown(event, props.engine)
        }

        const handleClick = (event: MouseEvent) => {
            if (props.disabled) return

            const nodeName = (event.target as Node).nodeName
            if (nodeName !== 'INPUT' && nodeName !== 'TEXTAREA') event.preventDefault()

            if (props.onClick && props.onClick(event, props.name, props.engine) === false) {
                return
            }
            if (props.autoExecute !== false) {
                let commandName = props.name
                let commandArgs: any = []
                if (props.command) {
                    if (!Array.isArray(props.command)) {
                        commandName = props.command.name
                        commandArgs = props.command.args
                    } else {
                        commandArgs = props.command
                    }
                }
                if (props.engine) props.engine.command.execute(commandName, ...commandArgs)
            }
        }

        const triggerMouseEnter = () => {
            active.value = props.disabled ? false : true
        }

        const triggerMouseLeave = () => {
            active.value = false
        }
        return {
            iconIsHtml: /^<.*>/.test((props.icon || '').trim()),
            active,
            disabled: props.disabled,
            handleClick,
            handleMouseDown,
            triggerMouseEnter,
            triggerMouseLeave
        }
    }
})
</script>
<style>
.prompt-popover-hide {
    display: none;
}
</style>
