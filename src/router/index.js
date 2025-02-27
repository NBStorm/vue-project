// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import ToDoList from "@/components/ToDoList.vue";
import AppDemSo from "@/components/AppDemSo.vue";
import BT2 from "@/components/BTW2.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/appdemso", component: AppDemSo },
  { path: "/todolist", component: ToDoList },
  { path: "/home", component: Home },
  { path: "/bt2", component: BT2 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
