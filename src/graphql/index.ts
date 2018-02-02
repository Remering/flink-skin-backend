import { makeExecutableSchema } from 'graphql-tools'
import TodoSchema from './todo/schema'
import TodoResolvers from './todo/resolver'

export default makeExecutableSchema({
    typeDefs: [TodoSchema],
    resolvers: TodoResolvers,
});

