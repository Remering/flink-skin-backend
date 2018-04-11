import * as Parse from 'parse/node'
import { ParseObjectSearch } from '../../helper'

export const isAuthorized = async token => {
    const q = new Parse.Query(Parse.Session).include('user').equalTo('sessionToken', token)
    const session = await q.first({ useMasterKey: true })
    if (typeof session === 'undefined') {
        throw new Error('Unauthorized')
    }
    return session.get('user')
}

export const UserResolver = {
    User: {
        id: (root) => root.id,
        username: (root) => root.get('username'),
        email: (root) => root.get('email'),
        name: (root) => root.get('name') || null,
        sessionToken: (root) => root.get('sessionToken'),
        address: root => root.get('address') || null,
        location: root => root.get('location') || null,
        createdAt: (root) => root.get('createdAt').getTime(),
        updatedAt: (root) => root.get('updatedAt').getTime(),
    },
    Query: {
        async UserCurrent(_, {}, { sessionToken }) {
            const session = await isAuthorized(sessionToken)
            return session
        },
        async User(_, { id }, { sessionToken }) {
            return new Parse.Query('User')
                .get(id)
        },
        async Users(_, { filter}, { sessionToken }) {
            return ParseObjectSearch('User', filter)
                .find()
        },
    },
    Mutation: {
        UserCreate(_, { input }, { Query, user }) {
            const { username, password, email } = input
            return new Parse.User().signUp({
                username,
                password,
                email,
            })
        },

        UserUpdate(_, { input }, { Query, user }) {
            const { username, password, email } = input
            return new Parse.User().signUp({
                username,
                password,
                email,
            })
        },
        UserPasswordUpdate(_, { username, password, email }, { Query, user }) {
            return new Parse.User().signUp({
                username,
                password,
                email,
            })
        },

        UserPasswordForgot(_, { email }, { Query, user }) {
            return Parse.User.requestPasswordReset(email)
        },

        UserLogin(_, { input }) {
            const { username, password } = input
            return Parse.User.logIn(username, password)
        },

        async UserDelete(_, { id }, { sessionToken, Query }) {
            const session = await isAuthorized(sessionToken)
            return session.destroy()
        },
    },
}
