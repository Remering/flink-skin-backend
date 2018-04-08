import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'

import { userMutations, userQueries, userType } from './resources/user/user.schema'
import { UserResolver } from './resources/user/user.resolver'
import { postMutations, postQueries, postType } from './resources/post/post.schema'
import { PostResolver } from './resources/post/post.resolver'
import { todoMutations, todoQueries, todoType } from './resources/todo/todo.schema'
import { TodoResolver } from './resources/todo/todo.resolvers'
// insert import

export const Query = `
    type Query {
        ${userQueries}
        ${postQueries}
        ${todoQueries}
    }
`

export const Mutation = `
    type Mutation {
        ${userMutations}
        ${postMutations}
        ${todoMutations}
    }
`

export const Resolvers = merge(
    UserResolver,
    PostResolver,
    TodoResolver,
    // insert resolver
)


export const Schemas = [
    userType,
    postType,
    todoType,
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