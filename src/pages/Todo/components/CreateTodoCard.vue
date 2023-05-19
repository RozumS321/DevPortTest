<template>
  <div class="create-card">
    <form @submit.prevent="onCreateTodoItem" class="create-card-form">
      <TextInput v-model="form.title" placeholder="by title" />
      <DSelect v-model="form.userId" :items="usersIds" />
      <DButton type="submit" label="Create" />
    </form>
  </div>
</template>

<script>
import DButton from "@/components/buttons/DButton.vue";
import DSelect from "@/components/forms/DSelect.vue";
import TextInput from "@/components/forms/TextInput.vue";
import { mapActions } from "vuex";
export default {
  components: { TextInput, DSelect, DButton },
  props: {
    usersIds: {
      type: Array,
    },
  },
  data() {
    return {
      form: {
        title: undefined,
        userId: undefined,
      },
    };
  },
  methods: {
    ...mapActions("todos", ["createTodoItem"]),
    async onCreateTodoItem() {
      await this.createTodoItem(this.form);
    },
  },
};
</script>

<style>
.create-card{
  margin: 0 20px;
}
.create-card-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
