<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-switch v-on="on" v-model="item.value" :label="item.name" @change="updateOptions"></v-switch>
    </template>

    <span>{{ item.tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    updateOptions() {
      this.$store.commit("updateOptions", this.item);
    }
  }
};
</script>
