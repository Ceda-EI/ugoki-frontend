<template>
  <page-header
    title="Ugoki"
    sub-title="Suggestions"
    @back="logout"
  />
  <h1 v-if="!suggestions.length"> No Suggestions left</h1>
  <div class="suggestions">
    <card
      hoverable
      class="suggestion"
      v-for="suggestion in suggestions"
      v-bind:key="suggestion.id"
    >
      <template #cover>
        <img v-bind:src="suggestion.url" loading="lazy"/>
      </template>
      <card-meta v-bind:title="'Suggestion for ' + suggestion.category_name">
        <template #description>
          {{suggestion.id}}
          <div class="buttons">
            <a-button type="primary" shape="round">
              <template #icon>
                <CheckOutlined />
              </template>
            </a-button>
            <a-button danger shape="round">
              <template #icon>
                <DeleteOutlined />
              </template>
            </a-button>
          </div>
        </template>
      </card-meta>
    </card>
  </div>
</template>

<script>
import store from "../store";
import router from "../router";
import { onBeforeMount } from "vue";
import { Button, Card, PageHeader } from "ant-design-vue";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons-vue";

export default {
  name: "Suggestions",
  components: {
    PageHeader,
    Card,
    CardMeta: Card.Meta,
    AButton: Button,
    CheckOutlined,
    DeleteOutlined,
  },
  setup() {
    onBeforeMount(() => {
      store.dispatch("showLoading");
      store.dispatch("getSuggestions");
    });
  },
  computed: {
    suggestions: () => store.state.suggestions,
  },
  methods: {
    logout: function() {
      store.dispatch("setCreds", { username: "", password: "" });
      router.push("/");
    }
  }
}
</script>

<style>
.suggestions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1em;
  align-items: center;
}

.suggestion {
  margin: 1em;
  width: 300px;
}

.buttons {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}
</style>