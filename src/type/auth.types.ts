
export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
};



export interface RegistrationFormInputs {
    username: string;
    email: string;
    password: string;
    fullname: string;
  }


export interface LoginFormInputs {
    email: string;
    password: string;
  }


export interface LoginFornInput {
    email: string;
    passsword: string;
}


export interface OTPInput {
    first_digit: string
    second_digit: string
    third_digit: string
    fourth_digit: string
    fifth_digit: string
    sixth_digit: string
}