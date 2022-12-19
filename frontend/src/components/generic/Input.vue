<template>
  <div>
    <label :for="name">{{ placeholder }}</label>
    <Field
      :name="name"
      v-model="value"
      :type="setType()"
      :rules="setRules()"
      :onChange="handleChange"
      :data-testid="`testid-${name}`"
    />
    <ErrorMessage :name="name" />
  </div>
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";
import { getRules } from "./rules.js";

export default {
  name: "custom_input",
  components: { Field, ErrorMessage },
  props: {
    placeholder: { type: String },
    name: { type: String, required: true },
    current: { type: String },
    onChange: { type: Function },
    type: { type: String },
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
    handleChange(e) {
      const value = e.target.value;
      this.onChange(value, this.name);
    },
    setType() {
      const defaultType = "text";
      const validTypes = ["text", "number", "date", "email", "password"];
      return validTypes.includes(this.type) ? this.type : defaultType;
    },
    setRules() {
      const defaultRules = "required";
      return getRules(this.rules ? this.rules : defaultRules);
    },
  },
};
</script>
