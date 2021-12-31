<template>
  <Grid :todo_list="todo_list" />
</template>

<script>
import Grid from "./_Grid.vue";
import gql from "graphql-tag";

export const GET_TODO_LIST = gql`
  query MyQuery {
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
  name: "QueryTable",
  components: {
    Grid,
  },
  apollo: {
    // Use Query
    todo_list: {
      query: GET_TODO_LIST,
    },
  },
};
</script>
