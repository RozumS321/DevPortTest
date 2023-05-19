import browserStorage from "@/helpers/browserStorage";
import api from "@/api";
const state = {
  user: browserStorage.getUser(),
  users: [],
};
const mutations = {
  setUser(state, user) {
    state.user = user;
    browserStorage.setUser(user);
  },
  setUsers(state, users) {
    state.users = users;
  },
  logout(state) {
    browserStorage.removeUser();
    state.user = null;
  },
};
const actions = {
  async listUsers({ commit }) {
    const users = await api.users.listUsers();
    commit("setUsers", users);
  },
  async getUser({ commit, state }, { phone, username }) {
    const user = state.users.find(
      (u) => u.phone === phone && u.username === username
    );
    if (!user) throw new Error("User not found");
    commit("setUser", user);
  },
};
const getters = {
  isExistUser(state) {
    return !!state.user;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
