<template>
  <v-select :items="rulesNames" label="Add a rule" @change="selectRule"></v-select>
</template>

<script>
export default {
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
      const rule = this.rulesList.filter(r => r.name === ruleName)[0];
      this.$store.commit("addRule", rule);
    }
  },
  data: () => ({})
};
</script>