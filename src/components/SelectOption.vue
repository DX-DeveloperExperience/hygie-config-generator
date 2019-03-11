<template>
  <v-select :items="optionsNames" label="Add an option" @change="selectOption"></v-select>
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
        this.items.filter(o => o.name === option)[0]
      );
    }
  },
  data: () => ({})
};
</script>