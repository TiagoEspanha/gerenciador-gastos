import { route as getRoute} from './get-by-user.js'
import { buildPathWithDomain } from '../../../modules/http.js'

const domain = 'expense';



export const routes = [
    buildPathWithDomain(getRoute, domain),
]

