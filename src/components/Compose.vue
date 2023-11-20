<template>
    <div
        class="container"
        :style="calculateStyle"
    >
        <div
            ref="controls"
            class="controls"
        >
            <textarea
                v-model="cover"
                class="cover"
                name="cover"
            ></textarea>
            <textarea
                v-model="message"
                class="message"
                name="message"
            ></textarea>
            <textarea
                v-model="stego"
                class="stego"
                name="stego"
            ></textarea>
        </div>
    </div>
</template>

<script>
import { pack, hide } from 'stegtext';

const MODES = {
    'SIMPLE': 'simple',
    'ADVANCED': 'advanced',
    'HIDDEN': 'hidden',
}

export default {
    name: 'Compose',

    data() {
        return {
            mode: MODES.HIDDEN,
            cover: null,
            message: null,
            stego: null,
            errors: {},
        };
    },

    methods: {
        calculateStyle() {
            return {

            };
        },

        hide(message, cover) {
            const packed = pack(message);
            try {
                this.stego = hide(packed, cover);
            } catch (e) {
                this.errors[cover] = {
                    message: e.message,
                    needed: e.needed,
                    hidden: e.hidden,
                };
            }        
        },
    },

    watch: {
        message(value) {
            this.hide(value, this.cover);
        },

        cover(value) {
            this.hide(this.message, value);
        },

        stego(value) {
            this.output.value = value;
        },
    },
};
</script>

<style scoped>
.container {

}

.controls {

}
</style>
