import browserStorage from "@/helpers/browserStorage";
import api from "@/api";
const state = {
  todoItems: [],
  favorites: browserStorage.getFavorites() || [],
};
const mutations = {
  setTodoItems(state, items) {
    state.todoItems = items;
  },
  setNewItem(state, item) {
    state.todoItems.unshift(item);
  },
  deleteTodoItem(state, todoId) {
    const index = state.todos.findIndex((todo) => todo.id === todoId);
    if (index === -1) return;
    state.todoItems.splice(index, 1);
  },

  changeFavoritesItem(state, item) {
    const existingIndex = state.favorites.findIndex((f) => f === item.id);
    if (existingIndex > -1) state.favorites.splice(existingIndex, 1);
    else state.favorites.push(item.id);
    browserStorage.updateFavorites(state.favorites);
  },

};
const actions = {
  async listTodoItems({ commit, state }, filters) {
    let items = await api.todos.listTodoItems({
      ...filters,
      completed:
        filters.completed === "favorite" ? undefined : filters.completed,
    });

    if (filters.completed === "favorite") {
      items = items.map((todo) => ({
        ...todo,
        favorite: !!state.favorites.find((f) => f === todo.id),
      }));
    }
    commit("setTodoItems", items);
  },
  async createTodoItem({ commit }, { userId, title }) {
    const todo = await api.todos.createTodoItem({ userId, title });
    commit("setNewItem", todo);
  },
  async deleteTodoItem({ commit }, { userId, todoId }) {
    await api.todos.deleteTodoItem({ userId, todoId });
  },
};
const getters = {
  isExistUser(state) {
    return !!state.user;
  },
  getTodoItems(state) {
    return [...state.todoItems]
      .map((todo) => ({
        ...todo,
        favorite: !!state.favorites.find((f) => f === todo.id),
      }))
      .sort((a, b) => (a.favorite ? -1 : 1));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
