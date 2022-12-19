<template>
  <div class="greetings">
    <h1 class="green">Despesas</h1>
    <table data-testid="expense-list">
      <tr>
        <th>Descrição</th>
        <th>Custo</th>
        <th>Categoria</th>
        <th>Data</th>
      </tr>
      <tr v-for="expense in expenses" :key="expense.id">
        <td>{{ expense.description }}</td>
        <td>{{ expense.amount }}</td>
        <td>{{ expense.categoryId }}</td>
        <td>{{ expense.date }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { setupAxios } from "../../utils/setup-axios.js";
import { getExpenses } from "../../api-client.js";
export default {
  data() {
    return {
      expenses: [],
    };
  },
  async mounted() {
    this.axios = setupAxios();
    await this.getExpenses();
  },
  methods: {
    async getExpenses() {
      this.expenses = (await getExpenses(this.axios, 1)).expenses;
    },
  },
};
</script>
