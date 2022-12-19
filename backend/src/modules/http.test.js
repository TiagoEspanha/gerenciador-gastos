import { httpVerbs } from './http.js';
import { buildPathWithDomain } from './http.js';
import { describe } from '@jest/globals'

const defaultRoute = {
    path: 'carro/lista',
    verb: httpVerbs.get,
    action: () => {} 
}
describe('modules/http', () => {
    describe('buildPathWithDomain', () => {
        it('deve adicionar o dominio na caminho(url)', () => {
            const route = {...defaultRoute}
            const domain = 'test'
            const expectedValue = `/${domain}/${route.path}`
            const res = buildPathWithDomain(route, domain)
            expect(res.path).toEqual(expectedValue)  
        });

        it('deve adicionar string vazia se o atributo path está vazio  ', () => {
            const route = {...defaultRoute, path: undefined}
            const domain = 'test'
            const expectedValue = `/${domain}/`
            const res = buildPathWithDomain(route, domain)
            expect(res.path).toEqual(expectedValue)  
            
            
        });
    })
    
});