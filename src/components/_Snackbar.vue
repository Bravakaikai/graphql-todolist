<template>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" icon dark v-bind="attrs" @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  data() {
    return {
      snackbar: false,
      text: null,
      timeout: 2000,
    };
  },
  methods: {
    openSnackbar(val) {
      this.snackbar = true;
      this.text = val;
    },
  },
};
</script>
