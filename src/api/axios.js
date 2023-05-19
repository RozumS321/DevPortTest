import Axios from "axios";
import { BASE_URL } from "@/helpers/constant";

const axios = Axios.create({ baseURL: BASE_URL });
axios.interceptors.request.use((config) => {
  if (!config?.params) return config;
  Object.keys(config.params).forEach((key) => {
    config.params[key] =
      config.params[key] || typeof config.params[key] == "boolean"
        ? config.params[key]
        : undefined;
  });
  return config;
});
export default axios;
