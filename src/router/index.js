// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import ToDoList from "@/components/ToDoList.vue";
import AppDemSo from "@/components/AppDemSo.vue";
import BT2 from "@/components/BTW2.vue";
import NoteApp from "@/components/NoteApp.vue";
import ProductList from "@/components/ProductList.vue";
import ExpenseTracker from "@/components/ExpenseTracker.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/appDemSo", component: AppDemSo },
  { path: "/toDoList", component: ToDoList },
  { path: "/home", component: Home },
  { path: "/bt2", component: BT2 },
  { path: "/noteApp", component: NoteApp },
  { path: "/productList", component: ProductList },
  { path: "/expenseTracker", component: ExpenseTracker },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
