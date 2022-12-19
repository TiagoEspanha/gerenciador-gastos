/* 
Critérios teste funcional Classe de equivalencia

-Amount
    - Classe válida: Maior ou igual a 0
    - Classe inválida: Menor que 0

-Description
    - Classe válida: Possuí texto menor que 10
    - Classe inválida: Não possui texto
    - Classe inválida: Possuí texto maior que 10

-CategoryId
    - Classe válida: Possuí valor de um ID válido de uma categoria
    - Classe inválida: Id inválido

-Date
    - Classe válida: Data válida no formato dd-mm-yyyy
    - Classe inválida: Data em formato inválido
    - Classe inválida: Data com dia maior que 31
    - Classe inválida: Data com mês maior que 12
*/

import { Expense } from './expense.js';
import { expect } from '@jest/globals';


const testCases = [
    {
        case: {
            amount: 1,
            description: "teste",
            categoryId: "3",
            date: '19-12-2022'
        },
        expectedFn: (wrapper) => {
            expect(wrapper).not.toThrow();
        }
    },
    {
        case: {
            amount: -1,
            description: "teste",
            categoryId: "3",
            date: '19-12-2022'
        },
        expectedFn: (wrapper) => {
            expect(wrapper).toThrow("Invalid amount value");
        }
    },
    {
        case: {
            amount: 1,
            description: "",
            categoryId: "3",
            date: '19-12-2022'
        },
        expectedFn: (wrapper) => {
            expect(wrapper).toThrow("Invalid description value");
        }
    },
    {
        case: {
            amount: 1,
            description: undefined,
            categoryId: "3",
            date: '19-12-2022'
        },
        expectedFn: (wrapper) => {
            expect(wrapper).toThrow("Invalid description value");
        }
    },
    {
        case: {
            amount: 1,
            description: "mais que dez letras",
            categoryId: "3",
            date: '19-12-2022'
        },
        expectedFn: (wrapper) => {
            expect(wrapper).toThrow("Invalid description value");
        }
    },
    {
        case: {
            amount: 1,
            description: "valido",
            categoryId: "6",
            date: '19-12-2022'
        },
        expectedFn: (wrapper) => {
            expect(wrapper).toThrow("Invalid categoryId value");
        }
    },
    {
        case: {
            amount: 1,
            description: "valido",
            categoryId: "4",
            date: '2022-12-12-10'
        },
        expectedFn: (wrapper) => {
            expect(wrapper).toThrow("Invalid date value");
        }
    },
    {
        case: {
            amount: 1,
            description: "valido",
            categoryId: "4",
            date: '32-12-2022'
        },
        expectedFn: (wrapper) => {
            expect(wrapper).toThrow("Invalid date value");
        }
    },
    {
        case: {
            amount: 1,
            description: "valido",
            categoryId: "4",
            date: '31-13-2022'
        },
        expectedFn: (wrapper) => {
            expect(wrapper).toThrow("Invalid date value");
        }
    },
];

describe('Expense domain', () => {
    testCases.forEach((t, index) => {
        test(index, () => {
            const wrapper = () => {
                new Expense({...t.case})
            };

            t.expectedFn(wrapper);
        })
    });
});

