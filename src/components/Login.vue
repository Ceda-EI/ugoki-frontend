<template>
  <div id="login">
    <card id="login-card">
      <h1>Ugoki</h1>
      <a-form
        layout="vertical"
        @submit="login"
      >
        <form-item>
          <a-input v-model:value="username" placeholder="Username" />
        </form-item>
        <form-item>
          <a-input v-model:value="password" type="password" placeholder="Password" />
        </form-item>
        <form-item>
          <a-button type="primary" html-type="submit" v-bind:disabled="disabledLogin">Log In</a-button>
        </form-item>
      </a-form>
    </card>
  </div>
</template>

<script>
import { Form, Input, Button, Card  } from "ant-design-vue";
import { onBeforeMount } from "vue";
import store from "../store";
export default {
  name: "Login",
  components: {
    aForm: Form,
    aInput: Input,
    aButton: Button,
    FormItem: Form.Item,
    Card
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    disabledLogin: function() {
      return this.username === "" || this.password === "";
    }
  },
  methods: {
    login: function() {
      const auth = {
        username: this.username,
        password: this.password
      };
      store.dispatch("setCreds", auth);
      this.$router.push("/suggestions");
    }
  },
  setup() {
    onBeforeMount(() => {
      const { username, password } = store.state.auth;
      if (username !== "" && password !== "")
        this.$router.push("/suggestions");
    });
  }
}
</script>

<style>
#login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#login-card {
  width: 50%;
  text-align: center;
}
</style>
