<template>
    <div
        id="container"
        :style="{ width: `${width}px` }"
    >
        <div class="row">
            <label
                class="label"
                for="cover"
            >
                Cover message
                <tooltip
                    text="An innocuous message to hide the secret message within"
                >
                    <svg-icon
                        :path="icons.help"
                        :size="16"
                        :style="{ float: 'right', color: 'blue' }"
                        type="mdi"
                    ></svg-icon>
                </tooltip>
            </label>
            <textarea
                v-model="cover"
                name="cover"
                placeholder="Enter a public message..."
                rows="5"
            ></textarea>
        </div>
        <div class="row">
            <label
                class="label"
                for="message"
            >
                Secret message
                <tooltip
                    text="A secret message to hide within the cover message"
                >
                    <svg-icon
                        :path="icons.help"
                        :size="16"
                        :style="{ float: 'right', color: 'blue' }"
                        type="mdi"
                    ></svg-icon>
                </tooltip>
            </label>
            <textarea
                v-model="message"
                name="message"
                placeholder="Enter your secret message..."
                rows="2"
            ></textarea>
        </div>
        <div class="row">
            <div
                :class="{ error: error, success: stego, label: true }"
            >
                Final message
                <tooltip
                    text="Copy message to clipboard to share"
                >
                    <a
                        @click.prevent="copy"
                        href="#"
                    >
                        <svg-icon
                            :path="icons.copy"
                            :size="16"
                            :style="{ float: 'right', color: (stego) ? 'blue' : 'grey' }"
                            type="mdi"
                        ></svg-icon>
                    </a>
                </tooltip>
            </div>
            <div
                name="output"
                :class="{ error: error, success: stego, output: true }"
            >{{ output }}</div>
        </div>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiContentCopy, mdiTooltipQuestionOutline } from '@mdi/js';
import { pack, hide } from 'stegtext';
import Tooltip from './Tooltip.vue';

export default {
    name: 'Compose',

    components: {
        SvgIcon,
        Tooltip,
    },

    props: {
        modelValue: {
            type: String,
            default: null,
        },

        width: {
            type: Number,
            default: 500,
        },
    },

    data() {
        return {
            icons: {
                copy: mdiContentCopy,
                help: mdiTooltipQuestionOutline,
            },
            help: {
                copy: 'Copy this message to your clipboard to post / send it',
                cover: 'An innocuous message for public consumption',
                secret: 'A message you wish to hide within the cover message',
            },
            cover: this.modelValue,
            message: null,
            stego: null,
            error: null,
        };
    },

    computed: {
        output() {
            if (this.error) {
                return this.error;
            }
            return this.stego;
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
            this.$emit('update:modelValue', value);
        },
    },

    methods: {
        copy() {
            if (!this.stego) {
                return;
            }

            try {
                navigator.clipboard.writeText(this.stego);
                alert('Message copied to clipboard');
            } catch (e) {
                alert('Could not copy to clipboard');
            }
        },

        hide(message, cover) {
            if (!message || !cover) {
                this.stego = null;
                return;
            }

            try {
                this.stego = hide(pack(message), cover);
                this.error = null;

            } catch (e) {
                console.error(e);
                this.error = e.message;
            }        
        },
    },
};
</script>

<style scoped>
#container {
    min-width: 250px;
}

.label {
    font-weight: bold;
    display: block;
    text-align: left;
    margin-top: 5px;
    margin-bottom: 2px;
}

.success {
    color: green;
    border-color: green;
}

.error {
    color: red;
    border-color: red;
}

.output {
    display: block;
    padding: 2px;
    width: 100%;
    border: 1px solid black;
    text-align: left;
    line-height: 2.5ex;
    height: 12.5ex;
}

.row {
    width: 100%;
}

textarea {
    line-height: 2.5ex;
    width: 100%;
    border: 1px solid black;
    resize: none;
}
</style>
