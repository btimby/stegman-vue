<template>
  <div>
    <textarea
      ref="text"
    ></textarea>
    <Compose
      :el="$refs.text"
    />
  </div>
</template>

<script>
import { Compose } from 'stegman-vue';

export default {
  name: 'Demo',

  components: {
    Compose,
  },
};
</script>

<style scoped>
</style>
