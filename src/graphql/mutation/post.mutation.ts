import { gql } from "@apollo/client";

export const CREATE_POST = gql`
mutation createPost($author: String!, $content: String!, $media: String) {
  createPost(input: { author: $author, content: $content, media: $media }) {
    id
    author{
      id
      fullname
      username
      avatar
    }
    media
    content
  }
}
`;

export const UPDATE_POST = gql`
mutation updatePost($userId: String){updatePost(input: {userId: $userId}){
        author
        media
        content
    }
}`


export const DELETE_POST = gql`
mutation deletePost($userId: String){deletePost(input: {userId: $userId}){
        author
    }
}
`