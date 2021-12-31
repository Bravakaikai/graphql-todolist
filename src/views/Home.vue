<template>
  <v-app>
    <QueryTable v-if="setEnv('Query')" />
    <SubscriptionTable v-else />
  </v-app>
</template>

<script>
import QueryTable from "@/components/QueryTable.vue";
import SubscriptionTable from "@/components/SubscriptionTable.vue";

export default {
  name: "Home",
  components: {
    QueryTable,
    SubscriptionTable,
  },
  methods: {
    setEnv(val) {
      return process.env.VUE_APP_TITLE == val;
    },
  },
};
</script>
