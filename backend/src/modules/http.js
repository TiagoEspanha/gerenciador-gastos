class HttpError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

export const httpErrors = {
    badRequest: new HttpError("Bad request", 400),
}

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