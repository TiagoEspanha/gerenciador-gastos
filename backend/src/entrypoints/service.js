import express from 'express'
import cors from 'cors';
import { httpVerbs } from '../modules/http.js'
import { ExpenseRepository } from '../components/expense/infrastructure/expense-repository.js' 
import { routes as expenseRoutes } from '../components/expense/interface/index.js'

const buildRoute = ({app, route, deps}) => {
    const action = async (req, res) => {
        const { params: routeParams } = req
        try {
            const obj = await route.action({routeParams, ...deps})
            return res.json({data: obj, status: 200});
        } catch (err) {
            return res.json({data: [err], status: 500});
        }
    }; 
    console.log("route.verb", route)
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


(async () => {
    const app = express()
    const port = 3000
    const expenseRepo = new ExpenseRepository();

    const deps = {
        expenseRepo,
    }
    const routes = [
        ...expenseRoutes
    ]

    
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




