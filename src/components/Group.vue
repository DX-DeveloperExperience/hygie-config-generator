<template>
  <v-card color="s_color">
    <div class="v-card-title border fit-width">
      <h1 class="headline mb-0">
        <v-text-field
          v-model="item.name"
          @change="updateGroupName"
          style="display:inline-block;padding:0;"
        ></v-text-field>
        <button
          aria-hidden="true"
          class="v-icon v-icon--link material-icons theme--light"
          @click="removeGroup"
        >
          clear
        </button>
      </h1>
    </div>
    <div class="v-card-content">
      <SelectRule location="group" :group="item" />
      <SelectRunnable :currentGroup="item" />

      <v-flex v-for="(rule, i) in groupRules" :key="`rule-${i}`">
        <Rule :item="rule" :displayRunnable="false" />
      </v-flex>

      <v-flex
        v-for="(runnable, i) in attachedRunnable"
        :key="`rule-${item.name}-runnable-${i}`"
      >
        <Runnable :item="runnable" :attachedGroup="item" />
      </v-flex>
    </div>
  </v-card>
</template>

<style>
.v-text-field__details {
  display: none;
}
.border {
  border: 1px solid grey;
}
</style>

<script>
import SelectRule from "./SelectRule";
import SelectRunnable from "./SelectRunnable";
import Rule from "./Rule";
import Runnable from "./Runnable";

export default {
  components: { SelectRule, SelectRunnable, Rule, Runnable },
  props: ["item"],
  computed: {
    attachedRunnable() {
      return this.item.runnables.length > 0 ? this.item.runnables : null;
    },
    groupRules() {
      return this.$store.state.groupsConf.find(g => g.id === this.item.id)
        .rules;
    }
  },
  methods: {
    removeGroup() {
      this.$store.commit("removeGroup", this.item);
    },
    updateGroupName(name) {
      if (name === "") name = "default name";
      this.$store.commit("updateGroupName", {
        group: this.item,
        name: name
      });
    }
  }
};
</script>
