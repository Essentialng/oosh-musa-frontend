import gql from "graphql-tag";

export const VERIFY_EMAIL = gql`
  mutation VerifyToken ($token: String!) {
    verifyToken (token: { token: $token}) {
      success
      message
    }
  }
`;


export const RESEND_TOKEN = gql`
  mutation ResendToken {
    resendToken {
      success
    }
  }
`;