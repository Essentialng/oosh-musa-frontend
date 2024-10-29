import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation CreateUser ($fullname: String!, $email: String!, $username: String!, $password: String!) {
    createUser (input: { fullname: $fullname, email: $email, username: $username, password: $password }) {
      id
      fullname
      email
    }
  }
`;


export const LOGIN_USER = gql`
mutation LoginUser($email: String!, $password: String!) {
  loginUser (input: {email: $email, password: $password}) {
    id
    fullname
    email
  }
}
`