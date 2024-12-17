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
    username
    email
    avatar
    profile
    accessToken
  }
}
`

export const UPDATE_USER = gql`
mutation updateUser(
$userId: String!, 
$username: String, 
$profession: String,
$avatar: String,
$phoneNumber: String,
$state: String,
$bio: String,
$dateOfBirth: String,
$placeOfBirth: String,
$gender: String,
$profile: String,
) {
  updateUser(input: {
    userId: $userId, 
    username: $username, 
    profession: $profession,
    avatar: $avatar,
    phoneNumber: $phoneNumber,
    state: $state,
    bio: $bio,
    dateOfBirth: $dateOfBirth,
    placeOfBirth: $placeOfBirth,
    gender: $gender,
    profile: $profile
  }) {
    id
    username
    fullname
    profession
    avatar
    phoneNumber
    state
    bio
    dateOfBirth
    placeOfBirth
    gender
    profile
  }
}
`

export const CREATE_EDUCATION = gql`
mutation createEducation(
$userId: String!, 
$institution: String!
$degree: String!
$fieldOfStudy: String!
$startDate: String!
$endDate: String!
) {
  createEducation (input: {
  userId: $userId, 
  institution: $institution
  degree: $degree
  fieldOfStudy: $fieldOfStudy
  startDate: $startDate
  endDate: $endDate
  }) {
    id
    institution
    degree
    fieldOfStudy
    startDate
    endDate
  }
}`


export const CREATE_WORK = gql`
mutation createWork(
$userId: String!, 
$company: String!
$position: String!
$startDate: String!
$endDate: String!
) {
  createWork (input: {
  userId: $userId, 
  company: $company
  position: $position
  startDate: $startDate
  endDate: $endDate
  }) {
    id
    company
    position
    startDate
    endDate
  }
}
`