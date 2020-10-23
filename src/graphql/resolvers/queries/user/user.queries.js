import { getUsersQuery } from './get-users.query'
import { userLoginQuery } from './user.login.query'

export const userQueries = {
    ...userLoginQuery,
    ...getUsersQuery
}