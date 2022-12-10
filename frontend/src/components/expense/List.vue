<script>
import { setupAxios } from '../../utils/setup-axios.js'
import { getExpenses } from '../../api-client.js';
export default {
  data() {
    return {
      expenses: [],
    }
  },
  async mounted () {
    this.axios = setupAxios();
    await this.getExpenses();
  },
  methods: {
    async getExpenses() {
      this.expenses = await getExpenses(this.axios, 1);
    },
  },
}
</script>

<template>
  <div class="greetings">
    <h1 class="green"> Gastos sas</h1>
  </div>
</template>