<template>
  <nav id="header">
    <div class="logout" v-if="isExistUser">
      <button @click="onLogout">logout</button>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters("users", ["isExistUser"]),
  },
  methods: {
    ...mapMutations("users", ["logout"]),
    onLogout() {
      this.logout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
#header {
  width: 100%;
  height: 60px;
  background: #474747;
}
.logout {
  text-align: end;
  height: 100%;
  margin: 0 20px;
}
.logout > button {
  height: 100%;
  background: rgb(255, 255, 255);
  border: none;
  font-weight: bold;
  padding: 0 15px;
}
</style>
