<template>
  <div class="greetings">
    <h1 class="green">Despesas</h1>
    <table>
      <tr>
        <th>Descrição</th>
        <th>Custo</th>
        <th>Categoria</th>
        <th>Tags</th>
      </tr>
      <tr v-for="expense in expenses" :key="expense.id">
        <td>{{ expense.description }}</td>
        <td>{{ expense.amount }}</td>
        <td>{{ expense.category }}</td>
        <td>{{ expense.tags }}</td>
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
      this.expenses = await getExpenses(this.axios);
    },
  },
};
</script>
