<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="text-h6 grey lighten-2">
        Delete Task ID {{ id }}
        <v-spacer />
        <v-btn color="black" icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="py-5" style="font-size: 16px">
        Do you want to delete task "{{ task }}" ?
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="remove"> Delete </v-btn>
        <v-btn color="primary" text @click="dialog = false"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { GET_TODO_LIST } from "./ToDoList.vue";
import gql from "graphql-tag";

const REMOVE_TODO_LIST = gql`
  mutation MyQuery($id: Int!) {
    delete_todo_list_by_pk(id: $id) {
      id
    }
  }
`;

export default {
  name: "DeleteDialog",
  data() {
    return {
      dialog: false,
      id: null,
      task: null,
    };
  },
  methods: {
    openDialog(val) {
      this.id = val.id;
      this.task = val.task;
      this.dialog = true;
    },
    remove() {
      this.$apollo.mutate({
        mutation: REMOVE_TODO_LIST,
        variables: {
          id: this.id,
        },
        update: (store, { data: { delete_todo_list_by_pk } }) => {
          this.dialog = false;
          try {
            let data = store.readQuery({
              query: GET_TODO_LIST,
            });
            data.todo_list = data.todo_list.filter(
              (item) => item.id != this.id
            );
            store.writeQuery({ query: GET_TODO_LIST, data });
            this.$emit("result", "Deleted Successfully!");
          } catch (err) {
            this.$emit("result", "Cannot Delete Task");
          }
        },
      });
    },
  },
};
</script>
