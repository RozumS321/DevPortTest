<template>
  <button
    @click="$emit('click')"
    ref="btn"
    :type="type"
    :class="{
      'button--primary': primary,
    }"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "button",
    },
    primary: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.$refs.btn.style.width = "100%";
    this.$refs.btn.style.paddingTop = "10px";
    this.$refs.btn.style.paddingBottom = "10px";
  },
};
</script>

<style>
button {
  border: none;
  padding: 4px 8px;
  cursor: pointer;
}

.button--primary {
  background: #519945;
  color: #ffffff;
}
</style>
