import Vue from "vue";
import Vuex from "vuex";
import users from "@/store/modules/users";
import todos from "@/store/modules/todos";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    todos,
  },
});
