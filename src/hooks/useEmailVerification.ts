// useEmailVerification.ts
// import { useMutation } from '@apollo/client';
// import { RESEND_TOKEN, VERIFY_EMAIL } from '../graphql/mutation/auth.mutation';
import toast from 'react-hot-toast';
import { AUTH_URL } from '../constant/resource';
import { useMakeRequest } from './useMakeRequest';

export const useEmailVerification = () => {
    // const [resendTokenMutation] = useMutation(RESEND_TOKEN);
    // const [verifyEmailMutation, { loading }] = useMutation(VERIFY_EMAIL);

    const makeRequest = useMakeRequest()

    const verifyEmail = async (token: string, email: string) => {
        // const response = await verifyEmailMutation({ variables: { token } });
        // return response?.data?.verifyToken?.success;
        const payload = {
            token: token,
            email: email
        }
        const response = await makeRequest(
            AUTH_URL + `/verifyEmail`,
            'POST',
            payload,
            ()=>{toast.success('Success')},
            ()=>{toast.success('Error')},
            console.log
        )
    };

    const resendToken = async (email: string) => {
        // const response = await resendTokenMutation();
        const response = await makeRequest(
            AUTH_URL + '/resendOTP',
            'POST',
            {email: email},
            ()=>{toast.success('Success')},
            ()=>{toast.success('Error')},
            console.log
        )
        return response?.data?.resendToken?.success;
    };

    return { verifyEmail, resendToken };
};