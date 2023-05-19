import { LS_FAVORITE_KEY, LS_USER_KEY } from "@/helpers/constant";

const setJsonItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
function parseJson(json) {
  try {
    return JSON.parse(json);
  } catch (err) {
    return {};
  }
}

const browserStorage = () => {
  const getUser = () => {
    const user = parseJson(localStorage.getItem(LS_USER_KEY));
    return user || null;
  };

  const setUser = (user) => {
    setJsonItem(LS_USER_KEY, user);
  };

  const removeUser = () => {
    localStorage.removeItem(LS_USER_KEY);
  };

  // FAVORITE

  const getFavorites = () => {
    const favorites = parseJson(localStorage.getItem(LS_FAVORITE_KEY));
    return favorites?.length ? favorites : null;
  };

  const updateFavorites = (items) => {
    setJsonItem(LS_FAVORITE_KEY, items);
  };

  return {
    setUser,
    getUser,
    removeUser,
    getFavorites,
    updateFavorites,
  };
};

export default browserStorage();
