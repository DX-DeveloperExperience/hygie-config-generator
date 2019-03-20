<template>
  <v-card color="t_color">
    <div class="v-card-title t_color_dark draggable">
      <h1 class="headline mb-0">
        {{ item.name }}
        <button
          aria-hidden="true"
          class="v-icon v-icon--link material-icons theme--light align-cross"
          @click="removeRunnable"
        >clear</button>
      </h1>
    </div>
    <div class="v-card-content">
      <div class="alert alert-info" v-html="displayTooltip(item.tooltip)"></div>

      <div class="alert alert-warning" v-if="hasWarn" v-html="displayWarning(item.tooltip)"></div>

      <v-select :items="['onBoth', 'onSuccess', 'onError']" label="Event" @change="setEvent"></v-select>

      <div v-for="(arg, i) in item.args" :key="`runnable-{item.name}-arg-${i}`">
        <v-text-field
          :label="`${arg.name}`"
          v-model="arg.value"
          @change="updateValue(arg.name, arg.value)"
        ></v-text-field>
      </div>
    </div>
  </v-card>
</template>

<script>
import * as marked from "marked";

export default {
  props: ["item", "attachedRule", "attachedGroup"],
  computed: {
    hasWarn() {
      return this.item.tooltip.indexOf("@warn") > -1;
    }
  },
  methods: {
    displayTooltip(tooltip) {
      const indexWarn = tooltip.indexOf("@warn");
      if (indexWarn > -1) {
        return marked(tooltip.substring(0, indexWarn));
      }
      return marked(tooltip);
    },
    displayWarning(tooltip) {
      return marked(
        tooltip.substring(tooltip.indexOf("@warn")).replace("@warn", "")
      );
    },
    updateValue(name, val) {
      this.$store.commit("updateRunnableArg", {
        rule: this.attachedRule,
        group: this.attachedGroup,
        runnable: this.item,
        argName: name,
        argValue: val
      });
    },
    removeRunnable() {
      this.$store.commit("removeRunnable", {
        rule: this.attachedRule,
        group: this.attachedGroup,
        runnable: this.item
      });
    },
    setEvent(event) {
      this.$store.commit("setRunnableEvent", {
        event: event,
        runnable: this.item,
        rule: this.attachedRule,
        group: this.attachedGroup
      });
    }
  }
};
</script>
