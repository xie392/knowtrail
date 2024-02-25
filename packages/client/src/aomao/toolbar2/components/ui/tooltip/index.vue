<script setup lang="ts">
interface ToolTipProps {
    title?: string
    placement?: 'top' | 'bottom'
}
withDefaults(defineProps<ToolTipProps>(), {
    title: '',
    placement: 'bottom'
})
</script>

<template>
    <div class="tooltip" :class="'tooltip-placement-' + placement">
        <div class="tooltip-btn">
            <slot></slot>
        </div>
        <div class="tooltip-con">
            {{ title }}
        </div>
    </div>
</template>

<style scoped lang="scss">
$distance: 8px;

.tooltip {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .tooltip-btn {
        display: inline-block;
        cursor: pointer;
        min-height: 25px;
    }

    .tooltip-con {
        position: absolute;
        z-index: 999;
        display: none;
        padding: 5px 10px;
        background-color: #000;
        color: #fff;
        line-height: 1.5;
        white-space: nowrap;
        opacity: 0.8;
        transition: opacity 0.5s;
        font-size: 13px;
        letter-spacing: 1.5;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    }

    &:hover {
        .tooltip-con {
            display: block;
        }
    }
}

.tooltip-placement-top {
    .tooltip-con {
        bottom: calc(100% + $distance);
        left: 50%;
        transform: translateX(-50%);

        &::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: #000 transparent transparent transparent;
        }
    }
}

.tooltip-placement-bottom {
    .tooltip-con {
        top: calc(100% + $distance);
        left: 50%;
        transform: translateX(-50%);

        &::after {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent #000 transparent;
        }
    }
}
</style>
