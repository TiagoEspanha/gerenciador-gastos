export const createExpense = async (expenseRepository, {
    amount,
    description,
    categoryId,
    date,
}) => {
    return await expenseRepository.create({ amount, description, categoryId, date })
}

export const truncateExpenseModel = async (ExpenseModel) => {
    await ExpenseModel.destroy({
        where: {},
        truncate: true,
        restartIdentity: true
    })
}

export const truncateUserModel = async (UserModel) => {
    await UserModel.destroy({
        where: {},
        truncate: { cascade: true },
        restartIdentity: true
    }) 
}

export const createUser = async (UserModel, {
    id, name, email, password
}) => {
    const _id = id ? id : 1;
    const _name = name ? name : "user 1";
    const _email = email ? email : "email@teste.com";
    const _password = password ? password : "teste";
    return await UserModel.create({
        id: _id,
        name: _name,
        email: _email,
        password: _password,
    })
}


