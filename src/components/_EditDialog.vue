<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="text-h6 grey lighten-2">
        {{ title }} Task&nbsp;<span v-show="title == 'Edit'"
          >ID {{ form.id }}</span
        >
        <v-spacer />
        <v-btn color="black" icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-form ref="form" v-model="valid" class="pa-5 pb-0">
        <v-text-field
          v-model.trim="form.task"
          label="Task"
          :rules="[(v) => !!v || 'Task is required']"
          clearable
          outlined
          required
        />
        <v-text-field
          v-model.trim="form.assignee"
          label="Assignee"
          :rules="[(v) => !!v || 'Assignee is required']"
          clearable
          outlined
          required
        />
      </v-form>
      <v-divider />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="submit"> Save </v-btn>
        <v-btn color="primary" text @click="dialog = false"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { GET_TODO_LIST } from "./QueryTable.vue";
import gql from "graphql-tag";

const INSERT_TODO_LIST = gql`
  mutation MyQuery($assignee: String!, $task: String!) {
    insert_todo_list_one(object: { assignee: $assignee, task: $task }) {
      id
      assignee
      created_at
      task
      updated_at
    }
  }
`;

const UPDATE_TODO_LIST = gql`
  mutation MyQuery($id: Int!, $assignee: String!, $task: String!) {
    update_todo_list_by_pk(
      pk_columns: { id: $id }
      _set: { assignee: $assignee, task: $task }
    ) {
      id
      assignee
      created_at
      task
      updated_at
    }
  }
`;

export default {
  name: "EditDialog",
  data() {
    return {
      dialog: false,
      valid: false,
      title: "Add",
      form: {
        id: null,
        task: null,
        assignee: null,
        created_at: null,
        updated_at: null,
      },
    };
  },
  methods: {
    openDialog(option, val) {
      this.title = option;
      if (option == "Add") {
        this.form.id = null;
        this.form.task = null;
        this.form.assignee = null;
        this.form.created_at = null;
        this.form.updated_at = null;
      }
      if (option == "Edit") {
        this.form = Object.assign({}, val);
      }
      this.dialog = true;
      if (this.$refs.form) this.$refs.form.resetValidation();
    },
    submit() {
      let valid = this.$refs.form.validate();
      if (!valid) return;
      if (this.title == "Add") {
        this.$apollo.mutate({
          mutation: INSERT_TODO_LIST,
          variables: {
            task: this.form.task,
            assignee: this.form.assignee,
          },
          update: (store, { data: { insert_todo_list_one } }) => {
            // Use Query
            if (process.env.VUE_APP_TITLE == "Query") {
              try {
                let data = store.readQuery({
                  query: GET_TODO_LIST,
                });
                data.todo_list.splice(0, 0, insert_todo_list_one);
                store.writeQuery({ query: GET_TODO_LIST, data });
                this.dialog = false;
                this.$emit("result", "Inserted Successfully!");
              } catch (err) {
                this.$emit("result", "Cannot Insert Task");
              }
            } else {
              // Use Subscription
              this.dialog = false;
              this.$emit("result", "Inserted Successfully!");
            }
          },
        });
      } else {
        this.$apollo.mutate({
          mutation: UPDATE_TODO_LIST,
          variables: {
            id: this.form.id,
            task: this.form.task,
            assignee: this.form.assignee,
          },
          update: (store, { data: { update_todo_list_by_pk } }) => {
            // Use Query
            if (process.env.VUE_APP_TITLE == "Query") {
              try {
                let data = store.readQuery({
                  query: GET_TODO_LIST,
                });
                store.writeQuery({ query: GET_TODO_LIST, data });
                this.dialog = false;
                this.$emit("result", "Updated Successfully!");
              } catch (err) {
                this.$emit("result", "Cannot Update Task");
              }
            } else {
              // Use Subscription
              this.dialog = false;
              this.$emit("result", "Updated Successfully!");
            }
          },
        });
      }
    },
  },
};
</script>
