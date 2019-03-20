<template>
  <v-select
    :items="rulesList"
    label="Add a rule"
    @change="selectRule"
    prepend-icon="ballot"
    item-value="name"
  >
    <template v-slot:item="{ item, index }">
      <div>
        <p class="select_name">{{ item.name }}</p>
        <p class="select_tooltip">{{ item.tooltip }}</p>
      </div>
    </template>
    <template v-slot:selection="{ item, index }">{{ item.name }}</template>
  </v-select>
</template>

<script>
export default {
  props: ["location", "group"],
  computed: {
    rulesList() {
      return this.$store.state.rulesList;
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
