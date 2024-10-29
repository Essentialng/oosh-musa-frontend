import gql from "graphql-tag";


export const GET_User = gql`
  query getUser {
    characters {
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;