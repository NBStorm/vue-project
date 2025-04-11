// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import ToDoList from "@/pages/ToDoList.vue";
import AppDemSo from "@/pages/AppDemSo.vue";
import BT2 from "@/pages/BTW2.vue";
import NoteApp from "@/pages/NoteApp.vue";
import ProductList from "@/pages/ProductList.vue";
import ExpenseTracker from "@/pages/ExpenseTracker.vue";
import MovieSearch from "@/pages/MovieSearch.vue";
import UserManager from "@/pages/UserManager.vue";
import BlogApp from "@/pages/BlogApp.vue";
import BlogDetail from "@/pages/BlogDetail.vue";  
const routes = [
  { path: "/", redirect: "/home" },
  { path: "/appDemSo", component: AppDemSo },
  { path: "/toDoList", component: ToDoList },
  { path: "/home", component: Home },
  { path: "/bt2", component: BT2 },
  { path: "/noteApp", component: NoteApp },
  { path: "/productList", component: ProductList },
  { path: "/expenseTracker", component: ExpenseTracker },
  { path: "/movieSearch", component: MovieSearch },
  { path: "/userManager", component: UserManager },
  {
    path: "/blogApp",
    name: "Blogs",
    component: BlogApp,
  },
  {
    path: "/blog/:id",
    name: "BlogDetail",
    component: BlogDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
