import * as Parse from 'parse/node'
import { isAuthorized } from '../User/User.resolver'

const ParseObject = Parse.Object.extend('Post')

export const PostResolver = {
    Post: {
        id: (root) => root.id,
        title: (root) => root.get('title'),
        createdAt: (root) => root.get('createdAt').getTime(),
        updatedAt: (root) => root.get('updatedAt').getTime(),
    },
    Query: {
        async Post(_, { id }) {
            return new Parse.Query(ParseObject).get(id)
        },

        async Posts(_, {} ) {
            return new Parse.Query(ParseObject).find()
        },
    },
    Mutation: {
        async PostCreate(_, { input }, { sessionToken }) {
            const session = await isAuthorized(sessionToken)
            const PostResolver = new ParseObject()
            Object.keys(input).map(key => PostResolver.set(key, input[ key ]))
            PostResolver.setACL(new Parse.ACL(session))
            return PostResolver.save()
        },
        async PostUpdate(_, { input }, { sessionToken }) {
            const session = await isAuthorized(sessionToken)
            const PostResolver = new ParseObject()
            Object.keys(input).map(key => PostResolver.set(key, input[ key ]))
            PostResolver.setACL(new Parse.ACL(session))
            return PostResolver.save()
        },
        async PostDelete(_, { id }, { sessionToken }) {
            const session = await isAuthorized(sessionToken)
            const todo = await new Parse.Query(ParseObject).get(id)
            return todo.destroy()
        },
    },
}
