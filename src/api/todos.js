import axios from "./axios";
export default {
  async listTodoItems(filters) {
    const res = await axios.get(`/todos`, { params: filters });
    return res.data;
  },

  async createTodoItem({ userId, title }) {
    const res = await axios.post(`/todos`, {
      title,
      userId,
    });
    return res.data;
  },
  // async updateTodoItem({ userId, todoId, title, completed }) {
  //   const res = await axios.put(`/users/${userId}/todos/${todoId}`, {
  //     title,
  //     completed,
  //   });
  //   return res.data;
  // },
  async deleteTodoItem({ userId, todoId }) {
    const res = await axios.delete(`/users/${userId}/todos/${todoId}`);
    return res.data;
  },
};
