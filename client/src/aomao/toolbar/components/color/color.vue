<template>
    <div
        :class="['toolbar-dropdown', 'colorpicker-button', { 'toolbar-dropdown-right': isRight }]"
        ref="buttonRef"
    >
        <div
            :class="[
                'toolbar-dropdown-trigger colorpicker-button-group',
                { 'colorpicker-button-group-active': visible }
            ]"
        >
            <am-button
                class="colorpicker-button-text"
                :name="name"
                :title="buttonTitle"
                :on-click="triggerClick"
                :disabled="disabled"
                :placement="placement"
            >
                <span v-html="buttonContent"></span>
            </am-button>
            <am-button
                class="colorpicker-button-dropdown toolbar-dropdown-trigger-arrow"
                :name="name"
                :title="dropdownTitle"
                :on-click="toggleDropdown"
                :disabled="disabled"
                :placement="placement"
                ref="targetRef"
            >
                <template #icon>
                    <span class="colorpicker-button-dropdown-empty" />
                </template>
                <span class="data-icon data-icon-arrow" />
            </am-button>
        </div>
        <div v-if="visible" class="toolbar-dropdown-list" data-element="ui">
            <am-color-picker
                :engine="engine"
                :colors="colors"
                :default-active-color="currentColor"
                :default-color="defaultColor"
                :on-select="triggerSelect"
                :set-stroke="setStroke"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onUnmounted, ref, watch } from 'vue'
import { colorProps } from '../../types'
import { useRight } from '../../hooks'
import AmButton from '../button.vue'
import AmColorPicker from './picker/picker.vue'
import Palette from './picker/palette'

export default defineComponent({
    name: 'am-color',
    components: {
        AmButton,
        AmColorPicker
    },
    props: colorProps,
    setup(props) {
        const visible = ref(false)

        const buttonRef = ref<HTMLDivElement | null>(null)
        const isRight = useRight(buttonRef)
        const targetRef = ref<typeof AmButton | undefined>(undefined)
        const currentColor = ref(props.defaultActiveColor)

        const getContent = () => {
            return typeof props.content === 'string'
                ? props.content
                : props.content(
                      currentColor.value,
                      Palette.getStroke(currentColor.value),
                      props.disabled
                  )
        }

        const buttonContent = ref(getContent())

        const toggleDropdown = (event: MouseEvent) => {
            event.preventDefault()

            if (visible.value) {
                hideDropdown()
            } else {
                showDropdown()
            }
        }

        const showDropdown = () => {
            visible.value = true
        }

        const hideDropdown = (event?: MouseEvent) => {
            if (
                event &&
                targetRef.value &&
                targetRef.value.element &&
                targetRef.value.element.contains(event.target as Node)
            )
                return
            visible.value = false
        }

        watch(
            () => visible.value,
            (value) => {
                if (value) document.addEventListener('click', hideDropdown)
                else document.removeEventListener('click', hideDropdown)
            }
        )

        const triggerClick = (event: MouseEvent) => {
            triggerSelect(currentColor.value, event)
        }

        const triggerSelect = (color: string, event: MouseEvent) => {
            hideDropdown()
            currentColor.value = color
            buttonContent.value =
                typeof props.content === 'string'
                    ? props.content
                    : props.content(color, Palette.getStroke(color), props.disabled)

            if (props.autoExecute !== false) {
                let commandName = props.name
                let commandArgs = [color, props.defaultColor]
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
            if (props.onSelect) props.onSelect(color, event)
        }

        onUnmounted(() => document.removeEventListener('click', hideDropdown))

        watch(
            () => ({ ...props }),
            () => (buttonContent.value = getContent())
        )

        return {
            buttonRef,
            isRight,
            visible,
            buttonContent,
            currentColor,
            triggerSelect,
            triggerClick,
            toggleDropdown,
            targetRef
        }
    }
})
</script>

<style scoped>
.editor-toolbar .colorpicker-button .colorpicker-button-group {
    padding: 0 2px;
}

.colorpicker-button-group .toolbar-button {
    padding: 0;
}

.colorpicker-button-group .colorpicker-button-text {
    margin-right: 0;
    min-width: 26px;
    border-radius: 3px 0 0 3px;
    display: block;
}

.editor-toolbar.editor-toolbar-popup .colorpicker-button-group .colorpicker-button-text {
    margin: 0;
    border-radius: 3px 0 0 3px;
}

.colorpicker-button-group .colorpicker-button-text:active {
    background-color: #e8e8e8;
}

.colorpicker-button-group .colorpicker-button-dropdown {
    margin-left: -1px;
    min-width: 17px;
    text-align: center;
    padding: 0 0;
    border-radius: 0 3px 3px 0;
    display: block;
}

.editor-toolbar.editor-toolbar-popup .colorpicker-button-group .colorpicker-button-dropdown {
    line-height: 24px;
    min-width: 17px;
    padding: 0 4px;
    margin: 0;
    margin-left: -1px;
    border-radius: 0 3px 3px 0;
}

.colorpicker-button-group .colorpicker-button-dropdown:hover,
.colorpicker-button-group .colorpicker-button-dropdown:active {
    background-color: #e8e8e8;
}

.colorpicker-button-group .colorpicker-button-dropdown .colorpicker-button-dropdown-empty {
    display: inline-block;
}

.colorpicker-button-group:hover .toolbar-button {
    border: 1px solid #e8e8e8;
}
.colorpicker-button-group-active .toolbar-button,
.colorpicker-button-group-active:hover .toolbar-button {
    border: 1px solid #e8e8e8;
}

/**----  copy ----- **/
.data-icon-arrow {
    position: absolute;
    right: 6px;
    top: calc(100% / 2 - 2px);
    width: 8px;
    height: 8px;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjhweCIgaGVpZ2h0PSI1cHgiIHZpZXdCb3g9IjAgMCA4IDUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1Mi41ICg2NzQ2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPkdyb3VwIENvcHkgNjwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGcgaWQ9IlN5bWJvbHMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9IjAuNDUiPg0KICAgICAgICA8ZyBpZD0idG9vbGJhciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMyOC4wMDAwMDAsIC0xOC4wMDAwMDApIj4NCiAgICAgICAgICAgIDxnIGlkPSJwYXJhZ3JhcGgtc3R5bGUiPg0KICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyNi4wMDAwMDAsIDQuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC1Db3B5LTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMi4wMDAwMDAsIDEyLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iOCI+PC9yZWN0Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAuNTk2MDkzNzUsMi41NTcwMzEyNSBMMy43NDUzMTI1LDYuMzc4MTI1IEMzLjg3NzM0Mzc1LDYuNTI1NzgxMjUgNC4xMDg1OTM3NSw2LjUyNTc4MTI1IDQuMjQwNjI1LDYuMzc4MTI1IEw3LjQwNTQ2ODc1LDIuNTU3MDMxMjUgQzcuNTk2MDkzNzUsMi4zNDI5Njg3NSA3LjQ0NDUzMTI1LDIuMDAzOTA2MjUgNy4xNTc4MTI1LDIuMDAzOTA2MjUgTDAuODQ0NTMxMjUsMi4wMDM5MDYyNSBDMC41NTcwMzEyNSwyLjAwMzkwNjI1IDAuNDA0Njg3NSwyLjM0Mjk2ODc1IDAuNTk2MDkzNzUsMi41NTcwMzEyNSBaIiBpZD0iU2hhcGUiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+);
    background-repeat: no-repeat;
    transition: all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1);
}

.data-icon-dot {
    position: absolute;
    top: 50%;
    left: 8px;
    margin-top: -7px;
    width: 14px;
    height: 14px;
    display: block;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjQgKDY3Mzc4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5VbnRpdGxlZDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9IjAuNDUiPgogICAgICAgIDxnIGlkPSJjaGVjayIgZmlsbD0iIzAwMDAwMCI+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIG9wYWNpdHk9IjAiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNMTIuNDY4NzUsMi41OTc2NTYyNSBMMTEuNTEzMDg1OSwyLjU5NzY1NjI1IEMxMS4zNzkxMDE2LDIuNTk3NjU2MjUgMTEuMjUxOTUzMSwyLjY1OTE3OTY5IDExLjE2OTkyMTksMi43NjQ0NTMxMiBMNS41MzMwMDc4MSw5LjkwNTI3MzQ0IEwyLjgzMDA3ODEyLDYuNDgwNDY4NzUgQzIuNzQ2Njc5NjksNi4zNzUxOTUzMSAyLjYyMDg5ODQ0LDYuMzEzNjcxODcgMi40ODY5MTQwNiw2LjMxMzY3MTg3IEwxLjUzMTI1LDYuMzEzNjcxODcgQzEuNDM5NjQ4NDQsNi4zMTM2NzE4NyAxLjM4OTA2MjUsNi40MTg5NDUzMSAxLjQ0NTExNzE5LDYuNDkwMDM5MDYgTDUuMTg5ODQzNzUsMTEuMjM0MTc5NyBDNS4zNjQ4NDM3NSwxMS40NTU2NjQxIDUuNzAxMTcxODcsMTEuNDU1NjY0MSA1Ljg3NzUzOTA2LDExLjIzNDE3OTcgTDEyLjU1NDg4MjgsMi43NzI2NTYyNSBDMTIuNjEwOTM3NSwyLjcwMjkyOTY5IDEyLjU2MDM1MTYsMi41OTc2NTYyNSAxMi40Njg3NSwyLjU5NzY1NjI1IFoiIGlkPSJQYXRoIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=);
    background-repeat: no-repeat;
}
</style>
