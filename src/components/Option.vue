<template>
  <v-switch v-model="item.value" :label="`${item.name}: ${item.value}`" @change="updateOptions"></v-switch>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    updateOptions() {
      this.$store.commit("updateOptions", this.item);
    }
  },
  data: () => ({})
};
</script>