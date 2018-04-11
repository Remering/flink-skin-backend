import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'
import { GlobalType } from './resources/global/global.types'
import { UserMutations, UserQueries, UserType } from './resources/User/User.schema'
import { UserResolver } from './resources/User/User.resolver'
// insert import

export const Query = `
    type Query {
        ${UserQueries}
    }
`

export const Mutation = `
    type Mutation {
        ${UserMutations}
    }
`

export const Resolvers = merge(
    UserResolver,
    // insert resolver
)


export const Schemas = [
    GlobalType,
    UserType,
    // insert type
]

const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`

export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation,
        ...Schemas,
    ],
    resolvers: Resolvers,
})