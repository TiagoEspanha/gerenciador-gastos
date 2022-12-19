import { httpVerbs, httpErrors } from '../../../modules/http.js'
import { Expense } from '../domain/expense.js'


export const route = {
    path: '',
    verb: httpVerbs.post,  
    action: async ({body, expenseRepository}) => {
        const { amount, description, date, categoryId } = body;
        let expense;
        try {
            expense = new Expense({ amount, description, categoryId, date })
        } catch (e) {
            throw httpErrors.badRequest;
        }
        
        await expenseRepository.create(expense);
        
        return {
            expense,
        }
    }
}