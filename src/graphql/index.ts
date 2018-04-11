import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'
import { GlobalType } from './resources/global/global.types'
import { UserMutations, UserQueries, UserType } from './resources/User/User.schema'
import { UserResolver } from './resources/User/User.resolver'
import { PostMutations, PostQueries, PostType } from './resources/Post/Post.schema'
import { PostResolver } from './resources/Post/Post.resolver'
import { PostCategoryMutations, PostCategoryQueries, PostCategoryType } from './resources/PostCategory/PostCategory.schema'
import { PostCategoryResolver } from './resources/PostCategory/PostCategory.resolver'
// insert import

export const Query = `
    type Query {
        ${ PostCategoryQueries }
        ${ PostQueries }
        ${UserQueries}
    }
`

export const Mutation = `
    type Mutation {
        ${ PostCategoryMutations }
        ${ PostMutations }
        ${UserMutations}
    }
`

export const Resolvers = merge(
    UserResolver,
    PostResolver,
PostCategoryResolver,
// insert resolver
)


export const Schemas = [
    GlobalType,
    UserType,
    PostType,
PostCategoryType,
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