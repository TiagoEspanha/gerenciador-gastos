import { createRouter, createWebHistory } from "vue-router";
import ExpenseHome from "../views/ExpenseHome.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "expense-home",
      component: ExpenseHome,
    },
  ],
});

export default router;
