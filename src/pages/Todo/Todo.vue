<template>
  <div class="todo_page">
    <CardInfo />
    <div class="todo-list">
      <div>
        <div class="todo-list-filters">
          <DSelect v-model="filters.completed" :items="statusTypes" />
          <DSelect v-model="filters.userId" :items="userIds" />
          <TextInput v-model="filters.title" placeholder="by title" />
        </div>
        <table>
          <thead>
            <tr>
              <th align="center">Favorite</th>
              <th align="center">Id</th>
              <th align="center">Title</th>
              <th align="center">Completed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in items" :key="todo.id">
              <td align="center">
                <Star
                  @click="changeFavoritesItem(todo)"
                  :active="todo.favorite"
                />
              </td>
              <td align="center">{{ todo.id }}</td>
              <td align="center">{{ todo.title }}</td>
              <td align="center">{{ todo.completed }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <CreateTodoCard :usersIds="userIds" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import Star from "@/components/Icons/Star.vue";
import CardInfo from "./components/CardInfo.vue";
import DSelect from "@/components/forms/DSelect.vue";
import TextInput from "@/components/forms/TextInput.vue";
import { statusTypes } from "@/helpers/constant";
import debounce from "lodash.debounce";
import CreateTodoCard from "./components/CreateTodoCard.vue";
export default {
  data() {
    return {
      filters: {
        completed: undefined,
        userId: undefined,
        title: undefined,
      },
      favorite: false,
      statusTypes,
      userIds: [],
    };
  },
  components: { Star, CardInfo, DSelect, TextInput, CreateTodoCard },
  computed: {
    ...mapState("users", ["user"]),
    ...mapState("todos", ["todoItems"]),
    ...mapGetters("todos", ["getTodoItems"]),
    items() {
      if (this.isFavorite) {
        return this.getTodoItems.filter((todo) => todo.favorite);
      }
      return this.getTodoItems;
    },
    isFavorite() {
      return this.filters.completed === "favorite" ? true : false;
    },
  },
  methods: {
    ...mapActions("todos", ["listTodoItems"]),
    ...mapMutations("todos", ["changeFavoritesItem"]),
  },
  watch: {
    filters: {
      async handler() {
        await this.listTodoItems({ ...this.filters });
      },
      deep: true,
    },
  },
  async mounted() {
    await this.listTodoItems(this.filters);
    const ids = new Set();
    this.todoItems.forEach((todo) => {
      ids.add(todo.userId);
    });
    this.userIds = [...ids].map((id) => ({ label: id, value: id }));
  },
};
</script>

<style scoped>
table {
  margin: 0 auto;
  display: block;
  height: 500px;
  overflow-y: scroll;
}
th,
td {
  height: 10px;
  padding: 5px 15px;
  color: #fff;
}
.todo_page {
  display: flex;
  margin-top: 20px;
  height: auto;
  overflow: auto;
  padding-left: 10px;
}
.todo-list {
  margin: 0 auto;
  display: flex;
}
.todo-list-filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

@media only screen and (max-width: 900px) {
  .todo_page {
    gap: 20px;
    flex-direction: column;
  }
}
</style>
