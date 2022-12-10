const headers = {
  headers: {
    contentType: 'application/json',
  },
};


export const getExpenses = async (axios, id) => {
    return await axios.get(`/expense/user/${id}`, headers);
};