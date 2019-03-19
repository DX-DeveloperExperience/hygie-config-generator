<template>
  <v-card color="t_color">
    <div class="v-card-title t_color_dark">
      <h1 class="headline mb-0">
        {{ item.name }}
        <button
          aria-hidden="true"
          class="v-icon v-icon--link material-icons theme--light"
          @click="removeRunnable"
        >
          clear
        </button>
      </h1>
    </div>
    <div class="v-card-content">
      <v-select
        :items="['onBoth', 'onSuccess', 'onError']"
        label="Event"
        @change="setEvent"
      ></v-select>

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
export default {
  props: ["item", "attachedRule", "attachedGroup"],
  methods: {
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
