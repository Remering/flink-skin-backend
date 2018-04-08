import * as Parse from 'parse/node'

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
        name: (root) => root.get('name'),
        sessionToken: (root) => root.get('sessionToken'),
    },
    Query: {
        async UserCurrent(root, {}, { sessionToken }) {
            const session = await isAuthorized(sessionToken)
            return session
        },
        async User(root, {}, { sessionToken }) {
            const session = await isAuthorized(sessionToken)
            return session
        },
        async Users(root, {}, { sessionToken }) {
            const session = await isAuthorized(sessionToken)
            return session
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
