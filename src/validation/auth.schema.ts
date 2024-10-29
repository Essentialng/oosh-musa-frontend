import * as yup from 'yup';

export const registrationSchema = yup.object().shape({
  fullname: yup.string().required('Fullname is required').min(3, 'Fullname must be at least 3 characters'),
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});


export const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
})


export const OTPSchema = yup.object().shape({
  first_digit: yup.string().required('OTP digit is required').length(1, 'Must be 1 character'),
  second_digit: yup.string().required('OTP digit is required').length(1, 'Must be 1 character'),
  third_digit: yup.string().required('OTP digit is required').length(1, 'Must be 1 character'),
  fourth_digit: yup.string().required('OTP digit is required').length(1, 'Must be 1 character'),
  fifth_digit: yup.string().required('OTP digit is required').length(1, 'Must be 1 character'),
  sixth_digit: yup.string().required('OTP digit is required').length(1, 'Must be 1 character'),
});