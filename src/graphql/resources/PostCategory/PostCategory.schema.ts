export const PostCategoryType= `
    type PostCategory {
        id: ID!
        title: String!
        posts: [Post!]
        user: User
        createdAt: Float!
        updatedAt: Float!
    }
    
    input PostCategoryInput {
        title: String!
    }
`

export const PostCategoryQueries = `
    PostCategory(id: ID!): PostCategory
    PostCategorys(
        filter: inputFilter 
    ): [ PostCategory! ]!
`

export const PostCategoryMutations = `
    PostCategoryCreate(input: PostCategoryInput!): PostCategory
    PostCategoryUpdate(input: PostCategoryInput!): PostCategory
    PostCategoryDelete(id: ID!): Boolean
`