import { gastos } from './2022/index.js';
import { gastosType, getTiposEspecificoPorTipoDeGasto } from './types.js';
const meses = ["janeiro", "fevereiro", "marco", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]


function main() {
    meses.forEach(mes => {
        const g = gastos[mes];
        if (g == undefined)
            return;
        
        console.log(`GASTOS DO MES DE: ${mes} \n`)
        gastosType.forEach(tipoDeGasto => {
            processBy(g[tipoDeGasto], tipoDeGasto)
        })
        
        
    });
}

function processBy(gastosMes, tipoDeGasto) {
    if (gastosMes == undefined) {
        return;
    }
    const tiposEspecificos = getTiposEspecificoPorTipoDeGasto()[tipoDeGasto];
    
    calcularTudo(gastosMes);
    tiposEspecificos.forEach((t) => {        
        calcularPorTipo(gastosMes,t)
    })
    
}

function calcularPorTipo(gastosMes, t) {
    const exclusivo = calcularApenasComUmTipo(gastosMes,t)
    const naoExclusivo = calcularPorTipoPresente(gastosMes,t)

    console.log(`GASTO EM ${t}: EXCLUSIVO ${exclusivo}, NÃO EXCLUSIVO ${naoExclusivo}`)
}


function calcularTudo(g){
    const soma = g.reduce( (acc, gasto) => {
        return acc + gasto.custo 
    }, 0)

    console.log(`SOMA TOTAL: ${soma}`)
}

function calcularApenasComUmTipo(g, tipo){
    const filtrado = g.filter(gg => gg.type.length == 1 && gg.type.includes(tipo) )
    const soma = filtrado.reduce( (acc, gasto) => {
        return acc + gasto.custo 
    }, 0)

    return soma

    
}

function calcularPorTipoPresente(g, tipo){
    const filtrado = g.filter(gg => gg.type.includes(tipo))
    const soma = filtrado.reduce( (acc, gasto) => {
        return acc + gasto.custo 
    }, 0)

    return soma
    
}




(() => {
    main()
})()


