import axios from "./axios";

export default {
  async listUsers() {
    const res = await axios.get("/users");
    return res.data;
  },
  async getUser(userId) {
    const res = await axios.get(`/users/${userId}`);
    return res.data;
  },
};
