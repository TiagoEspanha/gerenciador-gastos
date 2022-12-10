export const httpVerbs = {
    get: 'get',
    post: 'post'
}

export const buildPathWithDomain = (route, domain) => {
    return {
    ...route, 
    path: `/${domain}/${route.path}`
    }
};