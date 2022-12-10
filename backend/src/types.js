export const gastosType = ["lazer", "mercado", "farmarcia", "casa", "outros"]

export const lazerTypes = {
    COMIDA: 'comida',
    COMIDA_VOLEI: 'comida_volei',
    EXTRAORDIARIO: 'extraordianrio',
    PRESENTE: 'presente',
};



export const getTiposEspecificoPorTipoDeGasto = () => {
    const r = {}
    const dePara = {
        "lazer": lazerTypes,
        "mercado": {},
        "farmarcia": {},
        "casa": {},
        "outros": {}
    }
    gastosType.forEach(g => {
        r[g] = [];
        
        Object.values(dePara[g]).forEach(l => {
            r[g].push(l)            
        });
    })

    return r
}


