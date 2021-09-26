<template>
  <div id="login">
    <card id="login-card">
      <h1>Ugoki</h1>
      <a-form layout="vertical">
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
export default {
  name: 'Login',
  components: {
    aForm: Form,
    aInput: Input,
    aButton: Button,
    FormItem: Form.Item,
    Card
  },
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    disabledLogin: function() {
      return this.username === "" || this.password === "";
    }
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
