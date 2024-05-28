import { createRouter, createWebHistory } from "vue-router";

import Login from "./components/Login";
import Suggestions from "./components/Suggestions";
import Categories from "./components/Categories";
import Category from "./components/Category";

const routes = [
  {path: '/', component: Login},
  {path: '/suggestions/', component: Suggestions},
  {path: '/categories/', component: Categories},
  {path: '/category/:name/', component: Category},
]
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
