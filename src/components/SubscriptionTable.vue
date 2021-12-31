<template>
  <Grid :todo_list="todo_list" />
</template>

<script>
import Grid from "./_Grid.vue";
import gql from "graphql-tag";

export const SUBSCRIBE_TODO_LIST = gql`
  subscription MyQuery {
    todo_list(order_by: { updated_at: desc }) {
      assignee
      created_at
      id
      task
      updated_at
    }
  }
`;

export default {
  name: "SubscriptionTable",
  components: {
    Grid,
  },
  apollo: {
    // Use Subscription
    $subscribe: {
      todo_list: {
        query: SUBSCRIBE_TODO_LIST,
        result({ data }) {
          this.todo_list = data.todo_list;
        },
      },
    },
  },
  data() {
    return {
      todo_list: [],
    };
  },
};
</script>
