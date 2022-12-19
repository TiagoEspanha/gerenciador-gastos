import { createRouter, createWebHistory } from "vue-router";
import ExpenseHome from "../views/ExpenseHome.vue";
import ExpenseForm from "../components/expense/Form.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "expense-home",
      component: ExpenseHome,
    },
    {
      path: "/expense/form",
      name: "expense-form",
      component: ExpenseForm,
    },
  ],
});

export default router;
