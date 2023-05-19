<template>
  <ul class="text-white">
    <li v-for="(item, key) in items" :key="key">
      <template v-if="!isObject(item)">
        <span>{{ key }}</span>
        <span>{{ item }}</span>
      </template>
      <template v-else>
        <div class="child">
          {{ key }}<list-items :items="item"></list-items>
        </div>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: "list-items",
  props: {
    items: {
      type: [Array, Object],
      default: () => [],
    },
  },
  methods: {
    isObject(object) {
      return typeof object === "object";
    },
  },
};
</script>

<style>
.child {
  margin-left: 10px;
}
</style>
