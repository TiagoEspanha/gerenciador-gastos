export const httpVerbs = {
    get: 'get',
    post: 'post',
    delete: 'delete'
}

export const buildPathWithDomain = (route, domain) => {
    const p = route.path ? route.path : '' 
    return {
    ...route, 
    path: `/${domain}/${p}`
    }
};