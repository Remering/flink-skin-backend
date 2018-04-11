import * as Parse from 'parse/node'
import { isAuthorized } from '../User/User.resolver'

const ParseObject = Parse.Object.extend('PostCategory')

export const PostCategoryResolver = {
    PostCategory: {
        id: (root) => root.id,
        title: (root) => root.get('title'),
        posts: (root) => root.relation('posts').query().find(),
        createdAt: (root) => root.get('createdAt').getTime(),
        updatedAt: (root) => root.get('updatedAt').getTime(),
    },
    Query: {
        async PostCategory(_, { id }) {
            return new Parse.Query(ParseObject).get(id)
        },

        async PostCategorys(_, {}) {
            return new Parse.Query(ParseObject).find()
        },
    },
    Mutation: {
        async PostCategoryCreate(_, { input }, { sessionToken }) {
            const user = await isAuthorized(sessionToken)
            const PostCategoryResolver = new ParseObject()
            Object.keys(input).map(key => PostCategoryResolver.set(key, input[ key ]))
            PostCategoryResolver.setACL(new Parse.ACL(user))
            return PostCategoryResolver.save()
        },
        async PostCategoryUpdate(_, { input }, { sessionToken }) {
            const session = await isAuthorized(sessionToken)
            const PostCategoryResolver = new ParseObject()
            Object.keys(input).map(key => PostCategoryResolver.set(key, input[ key ]))
            PostCategoryResolver.setACL(new Parse.ACL(session))
            return PostCategoryResolver.save()
        },
        async PostCategoryDelete(_, { id }, { sessionToken }) {
            const session = await isAuthorized(sessionToken)
            const todo = await new Parse.Query(ParseObject).get(id)
            return todo.destroy()
        },
    },
}
