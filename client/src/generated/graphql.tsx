import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  me: User;
  comments: Array<Comment>;
  commentsbypost: Array<Comment>;
  posts: Array<Post>;
  products: Array<Product>;
  search: Array<Product>;
  productId: Product;
  likes: Array<Likes>;
  likesbypost: Array<Likes>;
};


export type QueryCommentsbypostArgs = {
  data: GetComments;
};


export type QuerySearchArgs = {
  data: Scalars['String'];
};


export type QueryProductIdArgs = {
  data: Scalars['Float'];
};


export type QueryLikesbypostArgs = {
  data: Getpost;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  username: Scalars['String'];
  avatar: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Int'];
  description: Scalars['String'];
  user: User;
  post: Post;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  description: Scalars['String'];
  createdAt: Scalars['String'];
  image: Scalars['String'];
  user: User;
  comments: Array<Comment>;
  likes: Array<Likes>;
};

export type Likes = {
  __typename?: 'Likes';
  id: Scalars['Int'];
  user: User;
  userId: Scalars['Float'];
  likesCounter: Scalars['Float'];
  post: Post;
};

export type GetComments = {
  postId: Scalars['Int'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Int'];
  size: Scalars['String'];
  title: Scalars['String'];
  images: Array<Scalars['String']>;
  price: Scalars['Float'];
  description: Scalars['String'];
};

export type Getpost = {
  postId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: GetToken;
  login: GetToken;
  createComment: Comment;
  createPosts: Post;
  createProducts: Product;
  createLikes: Likes;
  removeLikes: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationCreateCommentArgs = {
  data: CommentInput;
};


export type MutationCreatePostsArgs = {
  data: PostInput;
};


export type MutationCreateProductsArgs = {
  data: ProductInput;
};


export type MutationCreateLikesArgs = {
  data: LikesInput;
};


export type MutationRemoveLikesArgs = {
  data: RemoveInput;
};

export type GetToken = {
  __typename?: 'getToken';
  accessToken: Scalars['String'];
  user: User;
};

export type RegisterInput = {
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CommentInput = {
  description: Scalars['String'];
  postid: Scalars['Int'];
};

export type PostInput = {
  description: Scalars['String'];
  image: Scalars['String'];
};

export type ProductInput = {
  title: Scalars['String'];
  image: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
};

export type LikesInput = {
  likescounter: Scalars['Int'];
  postid: Scalars['Int'];
};

export type RemoveInput = {
  postId: Scalars['Int'];
};

export type CreateCommentMutationVariables = Exact<{
  description: Scalars['String'];
  postid: Scalars['Int'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'description'>
  ) }
);

export type CreateLikesMutationVariables = Exact<{
  likescounter: Scalars['Int'];
  postid: Scalars['Int'];
}>;


export type CreateLikesMutation = (
  { __typename?: 'Mutation' }
  & { createLikes: (
    { __typename?: 'Likes' }
    & Pick<Likes, 'id' | 'likesCounter'>
  ) }
);

export type CreatePostsMutationVariables = Exact<{
  description: Scalars['String'];
  image: Scalars['String'];
}>;


export type CreatePostsMutation = (
  { __typename?: 'Mutation' }
  & { createPosts: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'description' | 'image'>
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'getToken' }
    & Pick<GetToken, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ) }
  ) }
);

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'getToken' }
    & Pick<GetToken, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ) }
  ) }
);

export type RemoveLikesMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type RemoveLikesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeLikes'>
);

export type CommentsbypostQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type CommentsbypostQuery = (
  { __typename?: 'Query' }
  & { commentsbypost: Array<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'description'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'avatar' | 'username'>
    ) }
  )> }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'description' | 'image'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'avatar' | 'username'>
    ), comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id'>
    )>, likes: Array<(
      { __typename?: 'Likes' }
      & Pick<Likes, 'id' | 'likesCounter' | 'userId'>
    )> }
  )> }
);

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'size' | 'title' | 'images' | 'price' | 'description'>
  )> }
);

export type CommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { comments: Array<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'description'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'avatar' | 'username'>
    ), post: (
      { __typename?: 'Post' }
      & Pick<Post, 'id'>
    ) }
  )> }
);

export type LikesbypostQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type LikesbypostQuery = (
  { __typename?: 'Query' }
  & { likesbypost: Array<(
    { __typename?: 'Likes' }
    & Pick<Likes, 'id'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar'>
  ) }
);

export type ProductIdQueryVariables = Exact<{
  data: Scalars['Float'];
}>;


export type ProductIdQuery = (
  { __typename?: 'Query' }
  & { productId: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'size' | 'title' | 'images' | 'price' | 'description'>
  ) }
);

export type SearchQueryVariables = Exact<{
  data: Scalars['String'];
}>;


export type SearchQuery = (
  { __typename?: 'Query' }
  & { search: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'size' | 'title' | 'images' | 'price' | 'description'>
  )> }
);


export const CreateCommentDocument = gql`
    mutation createComment($description: String!, $postid: Int!) {
  createComment(data: {description: $description, postid: $postid}) {
    id
    description
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      description: // value for 'description'
 *      postid: // value for 'postid'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateLikesDocument = gql`
    mutation createLikes($likescounter: Int!, $postid: Int!) {
  createLikes(data: {likescounter: $likescounter, postid: $postid}) {
    id
    likesCounter
  }
}
    `;
export type CreateLikesMutationFn = Apollo.MutationFunction<CreateLikesMutation, CreateLikesMutationVariables>;

/**
 * __useCreateLikesMutation__
 *
 * To run a mutation, you first call `useCreateLikesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLikesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLikesMutation, { data, loading, error }] = useCreateLikesMutation({
 *   variables: {
 *      likescounter: // value for 'likescounter'
 *      postid: // value for 'postid'
 *   },
 * });
 */
export function useCreateLikesMutation(baseOptions?: Apollo.MutationHookOptions<CreateLikesMutation, CreateLikesMutationVariables>) {
        return Apollo.useMutation<CreateLikesMutation, CreateLikesMutationVariables>(CreateLikesDocument, baseOptions);
      }
export type CreateLikesMutationHookResult = ReturnType<typeof useCreateLikesMutation>;
export type CreateLikesMutationResult = Apollo.MutationResult<CreateLikesMutation>;
export type CreateLikesMutationOptions = Apollo.BaseMutationOptions<CreateLikesMutation, CreateLikesMutationVariables>;
export const CreatePostsDocument = gql`
    mutation createPosts($description: String!, $image: String!) {
  createPosts(data: {description: $description, image: $image}) {
    id
    description
    image
  }
}
    `;
export type CreatePostsMutationFn = Apollo.MutationFunction<CreatePostsMutation, CreatePostsMutationVariables>;

/**
 * __useCreatePostsMutation__
 *
 * To run a mutation, you first call `useCreatePostsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostsMutation, { data, loading, error }] = useCreatePostsMutation({
 *   variables: {
 *      description: // value for 'description'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreatePostsMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostsMutation, CreatePostsMutationVariables>) {
        return Apollo.useMutation<CreatePostsMutation, CreatePostsMutationVariables>(CreatePostsDocument, baseOptions);
      }
export type CreatePostsMutationHookResult = ReturnType<typeof useCreatePostsMutation>;
export type CreatePostsMutationResult = Apollo.MutationResult<CreatePostsMutation>;
export type CreatePostsMutationOptions = Apollo.BaseMutationOptions<CreatePostsMutation, CreatePostsMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(data: {email: $email, password: $password}) {
    accessToken
    user {
      id
      username
      avatar
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($name: String!, $email: String!, $username: String!, $password: String!) {
  register(
    data: {name: $name, email: $email, username: $username, password: $password}
  ) {
    accessToken
    user {
      id
      username
      avatar
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveLikesDocument = gql`
    mutation removeLikes($postId: Int!) {
  removeLikes(data: {postId: $postId})
}
    `;
export type RemoveLikesMutationFn = Apollo.MutationFunction<RemoveLikesMutation, RemoveLikesMutationVariables>;

/**
 * __useRemoveLikesMutation__
 *
 * To run a mutation, you first call `useRemoveLikesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLikesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLikesMutation, { data, loading, error }] = useRemoveLikesMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useRemoveLikesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLikesMutation, RemoveLikesMutationVariables>) {
        return Apollo.useMutation<RemoveLikesMutation, RemoveLikesMutationVariables>(RemoveLikesDocument, baseOptions);
      }
export type RemoveLikesMutationHookResult = ReturnType<typeof useRemoveLikesMutation>;
export type RemoveLikesMutationResult = Apollo.MutationResult<RemoveLikesMutation>;
export type RemoveLikesMutationOptions = Apollo.BaseMutationOptions<RemoveLikesMutation, RemoveLikesMutationVariables>;
export const CommentsbypostDocument = gql`
    query commentsbypost($postId: Int!) {
  commentsbypost(data: {postId: $postId}) {
    id
    description
    user {
      id
      avatar
      username
    }
  }
}
    `;

/**
 * __useCommentsbypostQuery__
 *
 * To run a query within a React component, call `useCommentsbypostQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsbypostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsbypostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsbypostQuery(baseOptions: Apollo.QueryHookOptions<CommentsbypostQuery, CommentsbypostQueryVariables>) {
        return Apollo.useQuery<CommentsbypostQuery, CommentsbypostQueryVariables>(CommentsbypostDocument, baseOptions);
      }
export function useCommentsbypostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsbypostQuery, CommentsbypostQueryVariables>) {
          return Apollo.useLazyQuery<CommentsbypostQuery, CommentsbypostQueryVariables>(CommentsbypostDocument, baseOptions);
        }
export type CommentsbypostQueryHookResult = ReturnType<typeof useCommentsbypostQuery>;
export type CommentsbypostLazyQueryHookResult = ReturnType<typeof useCommentsbypostLazyQuery>;
export type CommentsbypostQueryResult = Apollo.QueryResult<CommentsbypostQuery, CommentsbypostQueryVariables>;
export const PostsDocument = gql`
    query posts {
  posts {
    id
    description
    image
    user {
      id
      avatar
      username
    }
    comments {
      id
    }
    likes {
      id
      likesCounter
      userId
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const ProductsDocument = gql`
    query products {
  products {
    id
    size
    title
    images
    price
    description
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const CommentsDocument = gql`
    query comments {
  comments {
    id
    description
    user {
      id
      avatar
      username
    }
    post {
      id
    }
  }
}
    `;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommentsQuery(baseOptions?: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, baseOptions);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, baseOptions);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const LikesbypostDocument = gql`
    query likesbypost($postId: Int!) {
  likesbypost(data: {postId: $postId}) {
    id
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useLikesbypostQuery__
 *
 * To run a query within a React component, call `useLikesbypostQuery` and pass it any options that fit your needs.
 * When your component renders, `useLikesbypostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLikesbypostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikesbypostQuery(baseOptions: Apollo.QueryHookOptions<LikesbypostQuery, LikesbypostQueryVariables>) {
        return Apollo.useQuery<LikesbypostQuery, LikesbypostQueryVariables>(LikesbypostDocument, baseOptions);
      }
export function useLikesbypostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LikesbypostQuery, LikesbypostQueryVariables>) {
          return Apollo.useLazyQuery<LikesbypostQuery, LikesbypostQueryVariables>(LikesbypostDocument, baseOptions);
        }
export type LikesbypostQueryHookResult = ReturnType<typeof useLikesbypostQuery>;
export type LikesbypostLazyQueryHookResult = ReturnType<typeof useLikesbypostLazyQuery>;
export type LikesbypostQueryResult = Apollo.QueryResult<LikesbypostQuery, LikesbypostQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    username
    avatar
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProductIdDocument = gql`
    query productId($data: Float!) {
  productId(data: $data) {
    id
    size
    title
    images
    price
    description
  }
}
    `;

/**
 * __useProductIdQuery__
 *
 * To run a query within a React component, call `useProductIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductIdQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProductIdQuery(baseOptions: Apollo.QueryHookOptions<ProductIdQuery, ProductIdQueryVariables>) {
        return Apollo.useQuery<ProductIdQuery, ProductIdQueryVariables>(ProductIdDocument, baseOptions);
      }
export function useProductIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductIdQuery, ProductIdQueryVariables>) {
          return Apollo.useLazyQuery<ProductIdQuery, ProductIdQueryVariables>(ProductIdDocument, baseOptions);
        }
export type ProductIdQueryHookResult = ReturnType<typeof useProductIdQuery>;
export type ProductIdLazyQueryHookResult = ReturnType<typeof useProductIdLazyQuery>;
export type ProductIdQueryResult = Apollo.QueryResult<ProductIdQuery, ProductIdQueryVariables>;
export const SearchDocument = gql`
    query search($data: String!) {
  search(data: $data) {
    id
    size
    title
    images
    price
    description
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, baseOptions);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, baseOptions);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;