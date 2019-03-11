<template>
  <v-select :items="runnablesNames" label="Add a runnable" @change="selectRunnable"></v-select>
</template>

<script>
export default {
  props: ["currentRule"],
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
      console.log("Selected runnable: " + runnableName);

      const runnable = this.runnablesList.filter(
        r => r.name === runnableName
      )[0];

      this.$store.commit("addRunnableToRule", {
        rule: this.currentRule,
        runnable: runnable
      });
    }
  },
  data: () => ({})
};
</script>