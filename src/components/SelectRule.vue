<template>
  <v-select
    :items="rulesNames"
    label="Add a rule"
    @change="selectRule"
    prepend-icon="ballot"
  ></v-select>
</template>

<script>
export default {
  props: ["location", "group"],
  computed: {
    rulesList() {
      return this.$store.state.rulesList;
    },
    rulesNames() {
      return this.rulesList.map(r => r.name);
    }
  },
  methods: {
    selectRule(ruleName) {
      const rule = this.rulesList.find(r => r.name === ruleName);
      this.$store.commit("addRule", {
        rule: rule,
        location: this.location,
        group: this.group
      });
    }
  }
};
</script>
