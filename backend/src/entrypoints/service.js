import express from 'express'
import cors from 'cors';
import { httpVerbs } from '../modules/http.js'
import { ExpenseRepository } from '../components/expense/infrastructure/expense-repository.js' 
import { routes as expenseRoutes } from '../components/expense/interface/index.js'
import { Sequelize } from 'sequelize';

const buildRoute = ({app, route, deps}) => {
    const action = async (req, res) => {
        const { params: routeParams, body } = req
        try {
            const obj = await route.action({routeParams, body, ...deps})
            return res.json({data: obj, status: 200});
        } catch (err) {
            return res.json({data: [err], status: 500});
        }
    }; 

    switch (route.verb) {
        case httpVerbs.get:
            app.get(route.path, action)        
            break;
        case httpVerbs.post:
            app.post(route.path, action)    
        default:
            throw new Error("Invalid http verb")
    }
} 

const buildDatabase = () => {
    const sequelize = new Sequelize('gerenciador-gastos', 'postgres', 'postgres', {
        host: "localhost",
        port: 5432,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    });

    return sequelize;
}


(async () => {
    const app = express()
    const port = 3000
    const db = buildDatabase();
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    const expenseRepo = new ExpenseRepository();

    const deps = {
        expenseRepo,
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
        
        app._router.stack.forEach(function(r){
            if (r.route && r.route.path){
                console.log(r.route.path)
            }
        })
    })
    
})();




