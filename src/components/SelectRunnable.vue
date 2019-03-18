<template>
  <v-select
    :items="runnablesNames"
    label="Add a runnable"
    @change="selectRunnable"
    prepend-icon="loop"
  ></v-select>
</template>

<script>
export default {
  props: ["currentRule", "currentGroup"],
  computed: {
    runnablesList() {
      return this.$store.state.runnablesList;
    },
    runnablesNames() {
      return this.runnablesList.map(r => r.name);
    }
  },
  methods: {
    selectRunnable(runnableName) {
      const runnable = this.runnablesList.find(r => r.name === runnableName);

      if (this.currentRule !== undefined) {
        this.$store.commit("addRunnableToRule", {
          rule: this.currentRule,
          runnable: runnable
        });
      } else if (this.currentGroup !== undefined) {
        this.$store.commit("addRunnableToGroup", {
          group: this.currentGroup,
          runnable: runnable
        });
      }
    }
  }
};
</script>
