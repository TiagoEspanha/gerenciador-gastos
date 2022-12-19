<template>
  <CustomForm ref='validationObserver'>
    <div>
      <h3>Despesas</h3>
    </div>

    <CustomInput 
      placeholder="Valor" 
      name="amount" 
      :onChange="inputChange" 
      type="number"
    />

    <CustomInput
      placeholder="Descrição"
      name="description"
      :onChange="inputChange"
    />

    <CustomSelect
      placeholder="Categoria"
      name="categoryId"
      :options="formData.categories"
      :onChange="selectChange"
    />

    <!--
    <CustomSelect
      placeholder="Tags"
      name="tags"
      :options="formData.tags"
      :onChange="selectChange"
    />
    -->

    <CustomInput
      placeholder="Data da compra"
      name="date"
      type="date"
      :onChange="inputChange"
    />

    <div class="new-form-control">
      <button
        @click="submit"
      > Enviar
      </button>
    </div>
  </CustomForm>
</template>

<script>
import { Form as CustomForm } from "vee-validate";
import { setupAxios } from "../../utils/setup-axios.js";
import { saveExpense } from "../../api-client.js";
import CustomInput from "../generic/Input.vue";
import CustomSelect from "../generic/Select.vue";

export default {
  components: { CustomInput, CustomSelect, CustomForm },
  data() {
    return {
      entity: {
        amount: 0,
        description: "",
        categoryId: "",
        date: "",
        tags: [],

      },
      formData: {
        categories: [
          {
            value: 1,
            text: 'Lazer'
          }, {
            value: 2,
            text: 'Mercado'
          }, {
            value: 3,
            text: 'Farmarcia'
          }, {
            value: 4,
            text: 'Casa'
          }, {
            value: 5,
            text: 'Outros'
          }
        ],
        tags: [],
      },
    };
  },
  async mounted() {
    this.axios = setupAxios();

  },
  methods: {
    async submit() {
      const isValid = (await this.$refs.validationObserver.validate()).valid;
      if (isValid)
        await this.saveExpense();
    },
    inputChange(value, attribute) {
      this.entity[attribute] = value;
    },
    selectChange(value, text, attribute) {
      this.entity[attribute] = value;
    },
    async saveExpense() {
      const resp = await saveExpense(this.axios, {...this.entity});
    },
  },
};
</script>
