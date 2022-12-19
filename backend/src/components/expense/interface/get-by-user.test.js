import supertest from 'supertest';
import { buildApp } from '../../../app.js';
import { describe, beforeAll } from '@jest/globals'
import { createExpense, truncateExpenseModel, truncateUserModel, createUser } from './internal.js'


describe('get-by-user', () => {
    let app, expenseRepository, models;
    
    beforeAll(async () => {
        const service = await buildApp({name: "gerenciador-gastos-teste", port: 5433})
        app = service.app
        expenseRepository = service.deps.expenseRepository
        models = service.models
        await createUser(models.UserModel, {});
        
    });
    
    afterAll(async () => {
        const { ExpenseModel, UserModel } = models;
        await truncateExpenseModel(ExpenseModel)
        await truncateUserModel(UserModel)
        
    });
    
    it('Deve devolver todas despesas do usuário', async () => {
        await createExpense(expenseRepository, {
            amount: 10000,
            description: "teste 1",
            categoryId: "1",
            date: "12-12-2022"
        });

        await createExpense(expenseRepository, {
            amount: 10000,
            description: "teste 2",
            categoryId: "2",
            date: "12-12-2022"
        });

        
        const response = await supertest(app)
            .get('/expense/user/1');

        expect(response.statusCode).toEqual(200);
        expect(response.body.data.expenses.length).toEqual(2);            
    });

    it('Deve devolver array vazia quando usuário não possui despesas', async () => {
        
        const response = await supertest(app)
            .get('/expense/user/2');

        expect(response.statusCode).toEqual(200);
        expect(response.body.data.expenses.length).toEqual(0);            
    });

})



    