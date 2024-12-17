import gql from "graphql-tag";


export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(input: $id) {
      id
      fullname
      username
      email
      password
      createdAt
      updatedAt
      profession
      state
      bio
      dateOfBirth
      placeOfBirth
      gender
      phoneNumber
      profile
      avatar
      work {
        company
        position
        startDate
        endDate
      }
      education {
        institution
        degree
        fieldOfStudy
        startDate
        endDate
      }
    }
  }
`;