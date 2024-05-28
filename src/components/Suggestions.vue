<template>
  <app-header :visible="appHeaderOptions.SUGGESTIONS" subTitle="Suggestions" />
  <div class="suggestions">
    <h1 v-if="!suggestions.length"> No Suggestions left</h1>
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
            <a-button type="primary" shape="round" @click="() => approveSuggestion(suggestion.id)">
              <template #icon>
                <CheckOutlined />
              </template>
            </a-button>
            <a-button danger shape="round" @click="() => rejectSuggestion(suggestion.id)">
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
import config from "../config";
import { appHeaderOptions } from "../constants";
import { onBeforeMount } from "vue";
import { Button, Card } from "ant-design-vue";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import AppHeader from "./utils/AppHeader";
import axios from "axios";

export default {
  name: "Suggestions",
  components: {
    Card,
    CardMeta: Card.Meta,
    AButton: Button,
    CheckOutlined,
    DeleteOutlined,
    AppHeader,
  },
  setup() {
    onBeforeMount(() => {
      store.dispatch("getSuggestions");
    });
  },
  data() {
    return {
      appHeaderOptions,
    };
  },
  computed: {
    suggestions: () => store.state.suggestions,
  },
  methods: {
    approveSuggestion: (id) => {
      store.dispatch("showLoading");
      axios.post(`suggestion/${id}`, {}, {
        auth: store.state.auth,
        baseURL: config.API_URL
      })
      .then(() => store.dispatch('getSuggestions'))
      .catch(() => store.dispatch('getSuggestions'))
    },

    rejectSuggestion: (id) => {
      store.dispatch("showLoading");
      axios.delete(`suggestion/${id}`, {
        auth: store.state.auth,
        baseURL: config.API_URL
      })
      .then(() => store.dispatch('getSuggestions'))
      .catch(() => store.dispatch('getSuggestions'))
    },
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
