export const PostType= `
    type Post {
        id: ID!
        title: String!
        category: PostCategory
        user: User
        createdAt: Float!
        updatedAt: Float!
    }
    
    input PostInput {
        title: String!
        category: ID!
    }
`

export const PostQueries = `
    Post(id: ID!): Post
    Posts(
        filter: inputFilter 
    ): [ Post! ]!
`

export const PostMutations = `
    PostCreate(input: PostInput!): Post
    PostUpdate(input: PostInput!): Post
    PostDelete(id: ID!): Boolean
`