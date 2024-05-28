import { createStore } from "vuex";
import axios from "axios";
import config from "./config";
import router from "./router";

function handleError(ctx) {
  localStorage.removeItem("username");
  localStorage.removeItem("password");
  ctx.commit('setAuth', {username: "", password: ""})
  ctx.commit('setLoading', false);
  ctx.dispatch('showError', "Login Failed");
  router.replace("/");
}

const store = createStore({
  state() {
    return {
      auth: {
        username: localStorage.getItem("username") || "",
        password: localStorage.getItem("password") || "",
      },
      loading: false,
      suggestions: [],
      categories: [],
      alert: {
        show: false,
        type: "",
        message: ""
      }
    }
  },

  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },

    setAuth(state, auth) {
      state.auth = auth;
    },

    setAlert(state, alert) {
      state.alert = {...state.alert, ...alert};
    },

    setSuggestions(state, suggestions) {
      state.suggestions = suggestions;
    },

    setCategories(state, categories) {
      state.categories = categories.map(i => ({
        ...i,
        title: i.name[0].toUpperCase() + i.name.slice(1),
      }));
    }
  },

  actions: {
    setCreds(ctx, auth) {
      localStorage.setItem("username", auth.username);
      localStorage.setItem("password", auth.password);
      ctx.commit('setAuth', auth);
    },

    getSuggestions(ctx) {
      ctx.commit('setLoading', true);
      axios.get('suggestions', {
        baseURL: config.API_URL,
        auth: ctx.state.auth,
      })
        .then(
          resp => {
            ctx.commit('setLoading', false);
            ctx.commit('setSuggestions', resp.data);
            ctx.dispatch('hideAlert');
          }
        )
        .catch(() => handleError(ctx));
    },

    getCategories(ctx) {
      ctx.commit('setLoading', true);
      axios.get('categories', {
        baseURL: config.API_URL,
        auth: ctx.state.auth,
      })
        .then(
          resp => {
            ctx.commit('setLoading', false);
            ctx.commit('setCategories', resp.data);
            ctx.dispatch('hideAlert');
          }
        )
        .catch(() => handleError(ctx));
    },


    showError(ctx, message) {
      ctx.commit("setAlert", {
        show: true,
        type: "error",
        message
      });
    },

    hideAlert(ctx) {
      ctx.commit("setAlert", {
        show: false
      });
    },

    showLoading(ctx) {
      ctx.commit("setLoading", true);
    },

    hideLoading(ctx) {
      ctx.commit("setLoading", false);
    }
  }
})

export default store;
