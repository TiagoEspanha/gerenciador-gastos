import express from 'express'
import { httpVerbs } from '../modules/http.js'
import { ExpenseRepository } from '../components/expense/infrastructure/expense-repository.js' 
import { routes as expenseRoutes } from '../components/expense/interface/index.js'

const buildRoute = ({app, route, deps}) => {
    const action = async (req, res) => {
        console.log("action")
        const { params: routeParams } = req
        const obj = await route.action({routeParams, ...deps})
        console.log('dsdsd', obj)
        return res.json(obj);
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

    routes.forEach(route => {
        buildRoute({app, route, deps})
    });

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
        app._router.stack.forEach(function(r){
            if (r.route && r.route.path){
                console.log(r.route.path)
            }
        })
    })
    
})();




