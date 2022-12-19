import { httpVerbs } from '../../../modules/http.js'
import { Expense } from '../domain/expense.js'


export const route = {
    path: '',
    verb: httpVerbs.post,  
    action: async ({body, expenseRepository}) => {
        const { amount, description, date, categoryId } = body;
        const expense = new Expense({ amount, description, categoryId, date })
        await expenseRepository.create(expense);
        
        return {
            expense,
        }
    }
}