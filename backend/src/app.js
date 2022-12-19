import express from 'express'
import cors from 'cors';
import { httpVerbs } from './modules/http.js'
import { ExpenseRepository } from './components/expense/infrastructure/repository.js' 
import { routes as expenseRoutes } from './components/expense/interface/index.js'
import { Sequelize, DataTypes } from 'sequelize';
import buildExpenseModel  from '../models/expense.js';
import buildUserModel  from '../models/user.js';

const buildRoute = ({app, route, deps}) => {
    const action = async (req, res) => {
        const { params: routeParams, body } = req
        try {
            const obj = await route.action({routeParams, body, ...deps})
            return res.json({data: obj, status: 200});
        } catch (err) {
            console.log('ERRO:', err)
            return res.json({data: [err], status: 500});
        }
    }; 

    switch (route.verb) {
        case httpVerbs.get:
            app.get(route.path, action)        
            break;
        case httpVerbs.post:
            app.post(route.path, action)    
            break
        default:
            throw new Error("Invalid http verb")
    }
} 

const buildDatabase = (config) => {
    const c = {
        name: config?.name ? config.name : 'gerenciador-gastos',
        port: config?.port ? config.port : 5432,
    };

    const sequelize = new Sequelize(c.name, 'postgres', 'postgres', {
        host: "localhost",
        port: c.port,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    });

    const ExpenseModel = buildExpenseModel(sequelize, DataTypes)
    const UserModel = buildUserModel(sequelize, DataTypes)
    const models = {
        ExpenseModel,
        UserModel
    }
    return {
        sequelize,
        models,
    };
}

export const buildApp = async ({
    dbConfig
}) => {
    const app = express()
    const port = 3000
    const {
        sequelize: db,
        models,
    } = buildDatabase({name: "gerenciador-gastos-teste", port: 5433});
    
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    const expenseRepository = new ExpenseRepository({expenseModel: models.ExpenseModel});

    const deps = {
        expenseRepository,
    }
    const routes = [
        ...expenseRoutes
    ]

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors({
        origin: 'http://127.0.0.1:5173'
    }));

    routes.forEach(route => {
        buildRoute({app, route, deps})
    });


    app.listen(port, () => {
        console.log(`Listening on port ${port}`)

    })

    return {
        app,
        models,
        deps
    };
}
