<template>
  <v-select
    color="white--text"
    :items="items"
    label="Add an option"
    @change="selectOption"
    prepend-icon="settings"
    item-value="name"
  >
    <template v-slot:item="{ item, index }">
      <div>
        <p class="select_name">{{ item.name }}</p>
        <p class="select_tooltip">{{ item.tooltip }}</p>
      </div>
    </template>
  </v-select>
</template>

<script>
export default {
  props: ["items"],
  computed: {
    optionsNames() {
      return this.items.map(o => o.name);
    }
  },
  methods: {
    selectOption(option) {
      this.$store.commit(
        "updateOptions",
        this.items.find(o => o.name === option)
      );
    }
  }
};
</script>
