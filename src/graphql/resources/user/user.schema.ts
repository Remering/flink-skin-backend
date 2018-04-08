export const userType = `
    type User {
        id: ID!
        username: String!
        email: String!
        name: String!
        sessionToken: String
        posts: [Post]
    }
    
    input UserCreateInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }
    
    input UserLoginInput {
        username: String!
        password: String!
    }

    input UserUpdateInput {
        name: String!
        email: String!
        photo: String!
    }

    input UserUpdatePasswordInput {
        password: String!
    }
`

export const userQueries = `
    UserCurrent: User
    User(id: ID!): User
    Users(first: Int, offset: Int): [ User! ]!
`;

export const userMutations = `
    UserCreate(input: UserCreateInput!): User
    UserLogin(input: UserLoginInput!): User
    UserUpdate(input: UserUpdateInput!): User
    UserPasswordUpdate(input: UserUpdatePasswordInput!): Boolean
    UserPasswordForgot(email: String!): Boolean
    UserDelete(id: ID!): Boolean
`