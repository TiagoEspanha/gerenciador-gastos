import { route as getByUserRoute} from './get-by-user.js'
import { route as saveRoute} from './create.js'
import { buildPathWithDomain } from '../../../modules/http.js'

const domain = 'expense';



export const routes = [
    buildPathWithDomain(getByUserRoute, domain),
    buildPathWithDomain(saveRoute, domain),
]

