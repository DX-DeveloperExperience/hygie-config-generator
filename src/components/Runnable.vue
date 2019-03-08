<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ item.name }}</h3>
        <div>
          <v-select :items="item.args" label="Select an argument"></v-select>
        </div>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat color="orange">Share</v-btn>
      <v-btn flat color="orange">Explore</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["item"],
  data: () => ({})
};
</script>