<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ item.name }}</h3>
        <div>
          <v-select :items="item.options" label="Select an option"></v-select>

          <h4>Post-Actions</h4>
          <SelectRunnable :currentRule="item"/>
        </div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import SelectRunnable from "./SelectRunnable";

export default {
  components: { SelectRunnable },
  props: ["item"],
  data: () => ({})
};
</script>