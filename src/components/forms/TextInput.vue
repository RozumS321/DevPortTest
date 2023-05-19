<template>
  <div class="input-wrapper">
    <span v-if="label">{{ label }}</span>
    <input
      :placeholder="placeholder"
      :type="type"
      v-model="inputValue"
      :required="required"
    />
    <div>
      <span class="text--error">{{ error }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    errorMessage: {
      type: String,
      default: "Field is not valid",
    },
    validation: {
      type: Function,
    },
  },
  data() {
    return {
      error: "",
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.error = "";
        if (this?.validation && this?.validation(newValue)) {
          this.error = this.errorMessage;
        }
        this.$emit("input", newValue);
      },
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  width: 100%;
}
.input-wrapper input {
  background: #ffffff;
  border-radius: 5px;
  max-width: 397px;
  width: 100%;
  height: 41px;
  border: none;
  padding-left: 10px;
}
.input-wrapper input:focus {
  outline: none;
  border: 2px solid #519945;
}
.input-wrapper > span {
  display: block;
  letter-spacing: -0.025em;
  color: #5f5f5f;
  margin-bottom: 12px;
}
</style>
