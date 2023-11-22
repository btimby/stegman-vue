<template>
    <div
        @mousemove.prevent="showTooltip"
        @mouseout.prevent="hideTooltip"
        class="container"
    >
        <div
            ref="tooltip"
            id="tooltip"
            display="none"
        ></div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Tooltip',

    props: {
        text: {
            type: String,
            default: 'Set tooltip using text prop',
        },
    },

    methods: {
        showTooltip(ev) {
            const tp = this.$refs.tooltip;
            tp.innerHTML = this.text;
            tp.style.display = "block";
            tp.style.left = `${ev.pageX + 10}px`;
            tp.style.top = `${ev.pageY + 10}px`;
        },

        hideTooltip(ev) {
            const tp = this.$refs.tooltip;
            tp.style.display = 'none';
        },
    },
}
</script>

<style>
.container {
    display: inline-block;
}

#tooltip {
    font-size: .74em;
    background: cornsilk;
    color: black;
    border: 1px solid gold;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    display: none;
}
</style>
