import * as Parse from 'parse/node'
import { isAuthorized } from '../user/user.resolver'

const ParseObject = Parse.Object.extend('Todo')

export const TodoResolver = {
    Todo: {
        text: (root) => root.get('text'),
        isComplete: (root) => root.get('isComplete') || false,
        createdAt: (root) => root.get('createdAt').getTime(),
        updatedAt: (root) => root.get('updatedAt').getTime(),

    },
    Query: {
        Todo(_, { id }) {
            return new Parse.Query(ParseObject).get(id)
        },
        Todos(_, { isComplete }, { user }) {
            const query = new Parse.Query(ParseObject)

            if (typeof isComplete !== 'undefined') {
                query.equalTo('isComplete', isComplete)
            }
            if (user) {
                query.equalTo('user', user)
            }
            return query.find()
        },
    },
    Mutation: {
        async TodoCreate(_, { input }, { sessionToken }) {
            const user = await isAuthorized(sessionToken)
            const { text, isComplete } = input
            const newTodo = new ParseObject()
            newTodo.set('isComplete', isComplete)
            newTodo.set('text', text)

            if (user) {
                newTodo.setACL(new Parse.ACL(user))
            }
            return newTodo.save()
        },

        async TodoDelete(_, { id }, { Query }) {
            const item = new Query(ParseObject).get(id)
            return item.destroy()
        },

        async TodoUpdate(_, { input }, { Query, user }) {
            const { id, text, isComplete } = input
            const item = new Query(ParseObject).get(id)
            item.set('isComplete', isComplete)
            item.set('text', text)
            return item.save()
        },

        async TodoToggle(_, { id }, { Query }) {
            const item = await new Query(ParseObject).get(id)
            return item.save({ isComplete: !item.get('isComplete') })
        },
    },
}
