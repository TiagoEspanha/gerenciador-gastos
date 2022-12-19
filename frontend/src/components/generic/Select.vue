<template>
  <div>
    <select
      class="form-control"
      v-model="value"
      :name="buildSelectName()"
      @change="handleSelectChange"
    >
      <option value="" disabled hidden>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>

    <Field :name="name" :rules="setRules" v-model="value" hidden />
    <ErrorMessage :name="name" />
  </div>
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";
import { getRules } from './rules.js';

export default {
  components: { Field, ErrorMessage },
  name: "custom_select",
  props: {
    placeholder: { type: String },
    options: { type: Array, required: true },
    name: { type: String, required: true },
    current: { type: String },
    onChange: { type: Function },
    rules: { type: String },
  },
  data: function () {
    return {
      value: "",
    };
  },
  mounted() {
    this.value = this.current ? this.current : "";
  },
  methods: {
    handleSelectChange(e) {
      const selected = e.target.options[e.target.options.selectedIndex];
      const { value, text } = selected;
      this.onChange(value, text, this.name);
    },
    buildSelectName() {
      return `select-${this.name}`;
    },
    setRules() {
      const defaultRules = "required";
      return getRules(this.rules ? this.rules : defaultRules);
    },
  },
};
</script>
