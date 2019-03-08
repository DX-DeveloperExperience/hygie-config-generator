<template>
  <v-select :items="runnablesNames" label="Select a runnable" @change="selectRunnable"></v-select>
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
    selectRunnable(runnable) {
      console.log("current rule: ");
      console.log(this.currentRule);

      console.log("Selected runnable: " + runnable);

      this.$store.commit("addRunnableToRule", this.currentRule, runnable);
    }
  },
  data: () => ({})
};
</script>