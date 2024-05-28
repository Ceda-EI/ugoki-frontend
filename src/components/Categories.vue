<script>
import store from "../store";
import { appHeaderOptions } from "../constants";
import AppHeader from "./utils/AppHeader";
import { onBeforeMount } from "vue";

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      appHeaderOptions,
    };
  },
  computed: {
    categories: () => store.state.categories,
  },
  setup() {
    onBeforeMount(() => {
      store.dispatch("getCategories");
    });
  }
}
</script>

<style>
.categories {
  display: flex;
  justify-content: center;
  margin: 1em;
  flex-wrap: wrap;
  align-items: center;
}
.category {
  padding: 1em;
  width: 150px;
}
.category a {
  padding: 1em 0;
}
</style>

<template>
  <app-header :visible="appHeaderOptions.CATEGORIES" subTitle="Categories" />

  <div class="categories">
    <div v-for="category in categories" :key="category.name" class="category">
      <a :href="`/category/${category.name}`">{{ category.title }} <sup>{{ category.count }}</sup></a>
    </div>
  </div>
</template>
