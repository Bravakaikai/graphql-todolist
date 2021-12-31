<template>
  <div class="toDo">
    <v-card>
      <h1 class="my-3">My To Do List</h1>
      <v-btn outlined @click="openEditDialog('Add')"> + Add Task </v-btn>
      <v-card-title>
        <v-text-field
          v-model.trim="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table :headers="headers" :items="todo_list" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-icon class="mr-2" @click="openEditDialog('Edit', item)">
            mdi-pencil
          </v-icon>
          <v-icon @click="openDeleteDialog(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:item.created_at="{ item }">
          {{ getDateTime(item.created_at) }}
        </template>
        <template v-slot:item.updated_at="{ item }">
          {{ getDateTime(item.updated_at) }}
        </template>
      </v-data-table>
    </v-card>
    <DeleteDialog ref="deleteDialog" @result="openSnackbar($event)" />
    <EditDialog ref="editDialog" @result="openSnackbar($event)" />
    <Snackbar ref="snackbar" />
  </div>
</template>

<script>
import DeleteDialog from "./_DeleteDialog.vue";
import EditDialog from "./_EditDialog.vue";
import Snackbar from "./_Snackbar.vue";

export default {
  name: "Grid",
  components: {
    DeleteDialog,
    EditDialog,
    Snackbar,
  },
  props: {
    todo_list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Actions", value: "actions", sortable: false },
        { text: "ID", value: "id" },
        { text: "Task", value: "task" },
        { text: "Assignee", value: "assignee" },
        { text: "Created Date", value: "created_at" },
        { text: "Updated Date", value: "updated_at" },
      ],
    };
  },
  methods: {
    getDateTime(val) {
      const options = {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Taipei",
        hourCycle: "h23",
      };

      return val ? new Date(val).toLocaleString("zh-TW", options) : "無";
    },
    openEditDialog(option, val) {
      this.$refs.editDialog.openDialog(option, val);
    },
    openDeleteDialog(item) {
      this.$refs.deleteDialog.openDialog(item);
    },
    openSnackbar(e) {
      this.$refs.snackbar.openSnackbar(e);
    },
  },
};
</script>
<style lang="scss" scoped>
.toDo {
  padding: 30px;
  height: 100%;
  text-align: center;
  background-color: #dcccbb;
  .v-card {
    margin: auto;
    padding: 16px 30px;
    width: 85%;
    overflow: scroll;
  }
  .theme--light.v-icon:focus::after {
    opacity: 0;
  }
}
</style>
