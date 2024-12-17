import { gql } from "@apollo/client";

export const GET_POST = gql`
  query getPost($id: ID!) {
    getPost(input: $id) {
      author{
        id
        fullname
        username
        avatar
      }
      media
        likes
        share
        content
        comment{
          content
          media
          created_at
          updated_at
          likes
          share
        }
        created_at
        updated_at
    }
}
`;


export const GET_USER_POST = gql`
  query getUserPost($userId: ID!){
    getUserPost(input: $userId) {
      author{
        id
        fullname
        username
        avatar
      }
        media
        likes
        share
        content
        comment{
          content
          media
          created_at
          updated_at
          likes
          share
        }
        created_at
        updated_at
    }
  }
`


export const GET_ALL_POST = gql`
  query getAllPost {
    getAllPost {
      author{
      id
      fullname
      username
      avatar
    }
      media
      likes
      share
      content
      comment{
        content
        media
        created_at
        updated_at
        likes
        share
      }
      created_at
      updated_at
    }
}
`;


export const USER_POST = gql`
  query getPost($id: ID!) {
    getPost(input: $id) {
      author
      media
      content
    }
}
`;
