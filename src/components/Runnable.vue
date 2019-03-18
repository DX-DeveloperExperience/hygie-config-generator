<template>
  <v-card color="t_color tt_color">
    <div class="v-card-title t_color_dark">
      <h1 class="headline mb-0">{{ item.name }}</h1>
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

    <v-card-actions>
      <v-btn flat color="red" @click="removeRunnable">Remove</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["item", "attachedRule"],
  methods: {
    updateValue(name, val) {
      this.$store.commit("updateRunnableArg", {
        rule: this.attachedRule,
        runnable: this.item,
        argName: name,
        argValue: val
      });
    },
    removeRunnable() {
      this.$store.commit("removeRunnable", {
        rule: this.attachedRule,
        runnable: this.item
      });
    },
    setEvent(event) {
      this.$store.commit("setRunnableEvent", {
        event: event,
        runnable: this.item,
        rule: this.attachedRule
      });
    }
  }
};
</script>
