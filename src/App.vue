<template>
  <div class="alert">
    <alert
      v-bind:message="alert.message"
      v-bind:type="alert.type"
      v-if="alert.show"
      closable
      @close="closeAlert"
    />
  </div>
  <div
    class="loading"
    v-show="loading"
  >
    <spin size="large" />
  </div>
  <router-view></router-view>
</template>

<script>

import { RouterView } from "vue-router";
import { Alert, Spin } from "ant-design-vue";
import store from "./store";
export default {
  name: 'App',
  components: {
    RouterView,
    Alert,
    Spin,
  },
  computed: {
    alert: () => store.state.alert,
    loading: () => store.state.loading,
  },
  methods: {
    closeAlert: () => setTimeout(() => store.dispatch("hideAlert"), 300),
  }
};
</script>

<style>
.alert {
  position: absolute;
  right: 3em;
  top: 3em;
  width: 200px;
  z-index: 20;
}

.loading {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 10;
}
</style>
