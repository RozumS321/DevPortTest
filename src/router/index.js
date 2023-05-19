import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/pages/Login/Login.vue"),
    meta: {
      guard: false,
    },
  },
  {
    name: "todo",
    path: "/",
    component: () => import("@/pages/Todo/Todo.vue"),
    meta: {
      guard: true,
    },
  },
  {
    path: "/*",
    redirect: (to) => {
      return { name: "todo" };
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.guard) {
    if (!store.getters["users/isExistUser"]) return next({ name: "login" });
  }
  if (!to.meta.guard) {
    if (store.getters["users/isExistUser"]) return next({ name: "todo" });
  }
  return next();
});

export default router;
