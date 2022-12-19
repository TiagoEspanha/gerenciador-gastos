import { httpVerbs, httpErrors } from '../../../modules/http.js'


export const route = {
    path: `user/:userId`,
    verb: httpVerbs.get,  
    action: async ({routeParams, expenseRepository}) => {
        const { userId } = routeParams;
        if (!userId) {
            throw httpErrors.badRequest;
        }
        
        const expenses = await expenseRepository.getByUser(userId)
        
        return {
            expenses,
        }
    }
}