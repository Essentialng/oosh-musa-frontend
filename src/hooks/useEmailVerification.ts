// useEmailVerification.ts
import { useMutation } from '@apollo/client';
import { RESEND_TOKEN, VERIFY_EMAIL } from '../graphql/mutation/auth.mutation';

export const useEmailVerification = () => {
    const [resendTokenMutation] = useMutation(RESEND_TOKEN);
    const [verifyEmailMutation, { loading }] = useMutation(VERIFY_EMAIL);

    const verifyEmail = async (token: string) => {
        const response = await verifyEmailMutation({ variables: { token } });
        return response?.data?.verifyToken?.success;
    };

    const resendToken = async () => {
        const response = await resendTokenMutation();
        return response?.data?.resendToken?.success;
    };

    return { verifyEmail, resendToken, loading };
};