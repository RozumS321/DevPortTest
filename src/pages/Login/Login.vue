<template>
  <div id="login">
    <div class="card">
      <div class="card-header">
        <p>Description</p>
      </div>
      <form @submit.prevent="register" class="form">
        <TextInput
          label="username"
          placeholder="Type.."
          v-model="form.username"
          required
          :validation="(v) => !/^[A-Za-z\s]*$/.test(v)"
        />
        <TextInput
          label="phone"
          type="tel"
          placeholder="Type.."
          v-model="form.phone"
          required
          :validation="(v) => /[^0-9 x-]+/g.test(v)"
        />
        <DButton label="Register" type="submit" />
      </form>
    </div>
    <span class="error-message" v-if="formError">{{ formError }}</span>
  </div>
</template>

<script>
import DButton from "@/components/buttons/DButton.vue";
import TextInput from "@/components/forms/TextInput.vue";
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      form: {
        username: "",
        phone: "",
      },
      formError: "",
    };
  },
  methods: {
    ...mapActions("users", ["listUsers", "getUser"]),
    async register() {
      try {
        if (!this.form.username || !this.form.username) return;
        await this.getUser(this.form);
        this.$router.push({ name: "todo" });
      } catch (e) {
        this.formError = e.message;
        setTimeout(() => {
          this.formError = "";
        }, 2000);
      }
    },
  },
  async mounted() {
    await this.listUsers();
  },
  components: { TextInput, DButton },
};
</script>

<style>
#login {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#login .card {
  background: #c3c3c3;
  width: 400px;
  margin: 8px;
}

#login .form {
  margin: 0 auto;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
.card-header {
  background: #a5a5a5;
  color: #5f5f5f;
  padding: 15px;
  width: 100%;
  text-align: center;
}
</style>
