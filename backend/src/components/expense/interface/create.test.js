import supertest from 'supertest';
import { buildApp } from '../../../app.js';
import { describe, beforeAll } from '@jest/globals'
import { createExpense, truncateExpenseModel, truncateUserModel, createUser } from './internal.js'

describe('create', () => {
    let app, expenseRepository, models;
    const defaultExpensePayload = {
        amount: 100, 
        description: "despesa x", 
        date: "30-12-2022", 
        categoryId: 1, 
    }
    
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

    it('Deve criar despesa para usuário com id 1', async () => {
        const response = await supertest(app)
            .post('/expense/')
            .send({...defaultExpensePayload})
            .expect(200);

        const userExpenses = await expenseRepository.getByUser(1);
        expect(userExpenses.length).toEqual(1);       
    });

    it('Deve criar despesa para usuário com id 1', async () => {
        const response = await supertest(app)
            .post('/expense/')
            .send({...defaultExpensePayload, amount: undefined})
            .expect(400);
    });

})
    