import { Base } from './Base'
import { Role } from './Role'

export interface User extends Base {
  username: string
  role: Role
}
