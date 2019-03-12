<template>
  <v-card color="s_color st_color">
    <div class="v-card-title s_color_dark fit-width">
      <h1 class="headline mb-0">
        {{ item.name }}
        <button
          aria-hidden="true"
          class="v-icon v-icon--link material-icons theme--light"
          @click="removeRule"
        >clear</button>
      </h1>
    </div>
    <div class="v-card-content">
      <div v-for="(option, i) in item.options" :key="`rule-{item.name}-option-${i}`">
        <v-text-field
          :label="`${option.name}`"
          v-model="option.value"
          @change="updateValue(option.name, option.value)"
        ></v-text-field>
      </div>

      <h4>Post-Actions</h4>
      <SelectRunnable :currentRule="item"/>

      <v-flex v-for="(runnable, i) in attachedRunnable" :key="`rule-${item.name}-runnable-${i}`">
        <Runnable :item="runnable" :attachedRule="item"/>
      </v-flex>
    </div>
  </v-card>
</template>

<script>
import SelectRunnable from "./SelectRunnable";
import Runnable from "./Runnable";

export default {
  components: { SelectRunnable, Runnable },
  props: ["item"],
  computed: {
    attachedRunnable() {
      return this.item.runnables.length > 0 ? this.item.runnables : null;
    }
  },
  methods: {
    updateValue(name, val) {
      this.$store.commit("updateRuleOption", {
        rule: this.item,
        optionName: name,
        optionValue: val
      });
    },
    removeRule() {
      this.$store.commit("removeRule", this.item);
    }
  }
};
</script>