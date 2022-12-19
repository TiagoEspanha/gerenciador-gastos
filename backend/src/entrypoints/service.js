
import { buildApp } from '../app.js';


(async () => {
    const { app, deps }  = await buildApp({});
    app._router.stack.forEach(function(r){
        if (r.route && r.route.path){
            console.log(r.route.path)
        }
    })
})();




