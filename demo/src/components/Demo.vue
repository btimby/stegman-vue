<template>
  <div>
    <Write
      v-model="message"
      :width="800"
    />
  </div>
</template>

<script>
import { Write } from 'stegman-vue';
import 'stegman-vue/index.css';

export default {
  name: 'Demo',

  components: {
    Write,
  },

  data() {
    return {
      message: null,
    };
  },
};
</script>

<style scoped>
</style>
