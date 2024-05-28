<script>
import { appHeaderOptions } from "../../constants";
import store from "../../store";
import { Button, PageHeader } from "ant-design-vue";
export default {
  props: {
    visible: Number,
    subTitle: String,
  },
  components: {
    PageHeader,
    AButton: Button,
  },
  data() {
    return {
      appHeaderOptions,
    };
  },
  methods: {
    logout: function() {
      store.dispatch("setCreds", { username: "", password: "" });
      this.$router.push("/");
    },
  },
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <page-header
    title="Ugoki"
    :sub-title="subTitle"
  >
    <template #extra>
      <a-button v-if="visible != appHeaderOptions.CATEGORIES" @click="$router.push('/categories/')">View Existing Gifs</a-button>
      <a-button v-if="visible != appHeaderOptions.SUGGESTIONS" @click="$router.push('/suggestions/')">Suggestions</a-button>
      <a-button @click="logout">Logout</a-button>
    </template>
  </page-header>
</template>
