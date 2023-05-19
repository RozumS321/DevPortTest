<template>
  <div class="select-wrapper">
    <select v-model="selectValue">
      {{
        items
      }}
      <option :value="undefined">All</option>
      <option v-for="item in items" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
    },
  },
  data() {
    return {
      error: "",
    };
  },
  computed: {
    selectValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>

<style scoped>
.select-wrapper {
  width: 100%;
}
.select-wrapper select {
  background: #ffffff;
  border-radius: 5px;
  max-width: 397px;
  width: 100%;
  height: 41px;
  border: none;
  padding-left: 10px;
}
.select-wrapper select:focus {
  outline: none;
  border: 2px solid #519945;
}
.select-wrapper > span {
  display: block;
  letter-spacing: -0.025em;
  color: #5f5f5f;
  margin-bottom: 12px;
}
</style>
