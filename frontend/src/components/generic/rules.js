import * as yup from 'yup';

const requiredRule = yup.string().required();

const rules = {
    "required": requiredRule,
}

export const getRules = (r) => {
  return rules[r];
}