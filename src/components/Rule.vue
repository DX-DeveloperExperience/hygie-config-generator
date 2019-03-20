<template>
  <v-card color="s_color">
    <div class="v-card-title s_color_dark draggable">
      <h1 class="headline mb-0">
        {{ item.name }}
        <button
          aria-hidden="true"
          class="v-icon v-icon--link material-icons theme--light align-cross"
          @click="removeRule"
        >clear</button>
      </h1>
    </div>
    <div class="v-card-content">
      <div class="alert alert-info" v-html="displayTooltip()"></div>

      <div v-for="(option, i) in item.options" :key="`rule-${item.name}-option-${i}`">
        <v-text-field
          :label="`${option.name}`"
          v-model="option.value"
          @change="updateValue(option.name, option.value)"
        ></v-text-field>
      </div>

      <div v-if="displayRunnable">
        <h4>Post-Actions</h4>
        <SelectRunnable :currentRule="item"/>

        <v-flex v-for="(runnable, i) in attachedRunnable" :key="`rule-${item.name}-runnable-${i}`">
          <Runnable :item="runnable" :attachedRule="item"/>
        </v-flex>
      </div>
    </div>
  </v-card>
</template>

<script>
import SelectRunnable from "./SelectRunnable";
import Runnable from "./Runnable";
import * as marked from "marked";

export default {
  components: { SelectRunnable, Runnable },
  props: ["item", "displayRunnable"],
  computed: {
    attachedRunnable() {
      return this.item.runnables.length > 0 ? this.item.runnables : null;
    }
  },
  methods: {
    displayTooltip() {
      return marked(this.item.tooltip);
    },
    updateValue(name, val) {
      this.$store.commit("updateRuleOption", {
        rule: this.item,
        inGroup: this.displayRunnable ? false : true,
        optionName: name,
        optionValue: val
      });
    },
    removeRule() {
      this.$store.commit("removeRule", {
        rule: this.item,
        inGroup: this.displayRunnable ? false : true
      });
    }
  }
};
</script>
