import * as Parse from 'parse/node'
import { isAuthorized } from '../user/user.resolver'

const ParseObject = Parse.Object.extend('Post')

export const PostResolver = {
    Post: {
        id: (root) => root.id,
        message: (root) => root.get('message'),
        author: (root) => root.get('author'),
        createdAt: (root) => root.get('createdAt').getTime(),
        updatedAt: (root) => root.get('updatedAt').getTime(),
    },
    Query: {
        async Post(_, { id }) {
            return new Parse.Query(ParseObject).get(id)
        },

        async Posts(_, {}, { sessionToken }) {
            const session = await isAuthorized(sessionToken)
            return new Parse.Query(ParseObject)
                .include('author')
                .find({ sessionToken })
        },
    },
    Mutation: {
        async PostCreate(_, { input }, { sessionToken }) {
            const { message } = input
            const session = await isAuthorized(sessionToken)
            const postResolver = new ParseObject()
            postResolver.set('message', message)
            postResolver.set('author', session)
            postResolver.setACL(new Parse.ACL(session))
            return postResolver.save()
        },
        async PostUpdate(_, { input }, { sessionToken }) {
            const session = await isAuthorized(sessionToken)
            const { message } = input
            const postResolver = new ParseObject()
            postResolver.set('message', message)
            postResolver.set('author', session)
            postResolver.setACL(new Parse.ACL(session))
            return postResolver.save()
        },
        async PostDelete(_, { id }, { sessionToken, Query }) {
            const session = await isAuthorized(sessionToken)
            const todo = await new Query(ParseObject).get(id)
            return todo.destroy()
        },
    },
}
