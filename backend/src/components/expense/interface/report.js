import { httpVerbs } from '../../../modules/http.js'


export const route = {
    path: `user/:userId`,
    verb: httpVerbs.get,  
    action: async ({routeParams, expenseRepository}) => {
        const { userId } = routeParams;
        const expenses = []
        return {
            expenses,
        }
    }
}