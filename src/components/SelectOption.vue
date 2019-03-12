<template>
  <v-select
    color="white--text"
    :items="optionsNames"
    label="Add an option"
    @change="selectOption"
    prepend-icon="settings"
  ></v-select>
</template>

<script>
export default {
  props: ["items"],
  computed: {
    optionsNames() {
      return this.items.map(o => o.name);
    }
  },
  methods: {
    selectOption(option) {
      this.$store.commit(
        "updateOptions",
        this.items.find(o => o.name === option)
      );
    }
  }
};
</script>