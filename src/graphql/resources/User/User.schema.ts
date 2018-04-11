export const UserType = `
    type User {
        id: ID!
        name: String!
        email: String!
        username: String!
        sessionToken: String
        roleName: String!
        address: Address
        location: Geolocation
        createdAt: Float!
        updatedAt: Float!
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

export const UserQueries = `
    UserCurrent: User
    User(id: ID!): User
    Users(
        filter: inputFilter
    ): [ User! ]!
`;

export const UserMutations = `
    UserCreate(input: UserCreateInput!): User
    UserLogin(input: UserLoginInput!): User
    UserUpdate(input: UserUpdateInput!): User
    UserPasswordUpdate(input: UserUpdatePasswordInput!): Boolean
    UserPasswordForgot(email: String!): Boolean
    UserDelete(id: ID!): Boolean
`