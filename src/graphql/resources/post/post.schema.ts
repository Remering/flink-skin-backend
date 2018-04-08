export const postType= `
    type Post {
        id: ID!
        message: String!
        author: User!
        createdAt: Float!
        updatedAt: Float!
    }
    
    input PostInput {
        message: String!
    }
`

export const postQueries = `
    Post(id: ID!): Post
    Posts(first: Int, offset: Int): [ Post! ]!
`

export const postMutations = `
    PostCreate(input: PostInput!): Post
    PostUpdate(input: PostInput!): Post
    PostDelete(id: ID!): Boolean
`