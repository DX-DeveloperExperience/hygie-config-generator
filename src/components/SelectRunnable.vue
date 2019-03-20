<template>
  <v-select
    :items="runnablesList"
    label="Add a runnable"
    @change="selectRunnable"
    prepend-icon="loop"
    item-value="name"
  >
    <template v-slot:item="{ item, index }">
      <div>
        <p class="select_name">{{ item.name }}</p>
        <p
          class="select_tooltip"
          v-if="(item.tooltip.indexOf('@warn')) > -1"
        >{{ item.tooltip.substring(0, item.tooltip.indexOf('@warn')) }}</p>
        <p class="select_tooltip" v-else>{{ item.tooltip }}</p>
      </div>
    </template>
    <template v-slot:selection="{ item, index }">{{ item.name }}</template>
  </v-select>
</template>

<script>
export default {
  props: ["currentRule", "currentGroup"],
  computed: {
    runnablesList() {
      return this.$store.state.runnablesList;
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
