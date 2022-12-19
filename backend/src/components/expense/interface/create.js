import { httpVerbs } from '../../../modules/http.js'
import { Expense } from '../domain/expense.js'


export const route = {
    path: '',
    verb: httpVerbs.post,  
    action: async ({body, expenseRepository}) => {
        const { amount, description, category, tags } = body;
        const expense = new Expense({ amount, description, category, tags })
        await expenseRepository.create(expense);
        
        return {
            expense,
        }
    }
}