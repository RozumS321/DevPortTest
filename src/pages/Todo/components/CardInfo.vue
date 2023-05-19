<template>
  <div class="card-info">
    <list-items :items="user"></list-items>
  </div>
</template>

<script>
import { mapState } from "vuex";
import listItems from "./ListItems.vue";
export default {
  components: { listItems },
  computed: {
    ...mapState("users", ["user"]),
  },
};
</script>

<style>
.card-info {
  background: #474747;
  padding: 25px;
  height: 100%;
}
</style>
