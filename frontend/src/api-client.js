const headers = {
  headers: {
    contentType: "application/json",
  },
};

export const getExpenses = async (axios, id) => {
  return await axios.get(`/expense/user/${id}`, headers);
};

export const saveExpense = async (axios, {amount, description, categoryId, date}) => {
  const body = {amount, description, categoryId, date}
  return await axios.post(`/expense/`, body, headers);
};
