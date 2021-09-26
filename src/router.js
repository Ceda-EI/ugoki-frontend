import { createRouter, createWebHistory } from "vue-router";

import Login from "./components/Login";
import Suggestions from "./components/Suggestions";

const routes = [
  {path: '/', component: Login},
  {path: '/suggestions', component: Suggestions},
]
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
