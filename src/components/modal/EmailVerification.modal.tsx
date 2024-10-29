import React, { forwardRef, useImperativeHandle } from 'react';
import emailTemp from '../../assets/others/email.svg';
import { useForm } from 'react-hook-form';
import { OTPInput } from '../../type/auth.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { OTPSchema } from '../../validation/auth.schema';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import  { useEmailVerification }  from '../../hooks/useEmailVerification'; // Create this custom hook
import { useModal } from '../../hooks/useModal'; // Create this custom hook

export interface EmailVerificationRef {
    showModal: () => void;
    closeModal: () => void;
}

const EMAIL_VERIFICATION_MODAL_ID = 'email_verification_modal';
const OTP_DIGITS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

const EmailVerification = forwardRef<EmailVerificationRef>((_, ref) => {
    const navigate = useNavigate();
    const { isOpen, openModal, closeModal } = useModal(EMAIL_VERIFICATION_MODAL_ID);
    const { verifyEmail, resendToken, loading } = useEmailVerification();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<OTPInput>({
        resolver: yupResolver(OTPSchema)
    });

    useImperativeHandle(ref, () => ({
        showModal: openModal,
        closeModal
    }));

    const onSubmit = async (data: OTPInput) => {
        const token = Object.values(data).join('');
        try {
            const success = await verifyEmail(token);
            if (success) {
                toast.success('Email verified');
                setTimeout(closeModal, 1000);
                navigate('/login');
            } else {
                toast.error('Verification failed');
            }
        } catch (error: any) {
            toast.error(error.message || 'Invalid or expired token');
        }
    };

    const handleResend = async () => {
        try {
            const success = await resendToken();
            if (success) {
                toast.success('Code resent. Please check your email.');
            }
        } catch (error) {
            toast.error('Error sending token. Please try again.');
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { maxLength, value, nextElementSibling } = e.target;
        if (value.length >= maxLength && nextElementSibling instanceof HTMLInputElement) {
            nextElementSibling.focus();
        }
    };

    return (
        <div>
            <input type="checkbox" id={EMAIL_VERIFICATION_MODAL_ID} className="modal-toggle" checked={isOpen} readOnly />
            <div className="modal">
                <div className="modal-box">
                    <h1 className='mb-2 text-center font-semibold'>Verify Your Email</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-start h-[fit]'>
                        <button type="button" onClick={closeModal} className="btn btn-sm btn-circle btn-ghost bg-red-300 absolute right-2 top-2 text-red-500">✕</button>
                        <img className='w-20 h-20' src={emailTemp} alt="email" />
                        <p className='my-5'>Please enter the six digit code sent to your email</p>

                        <div className='flex items-center gap-2'>
                            {OTP_DIGITS.map((digit, index) => (
                                <input
                                    key={digit}
                                    {...register(`${digit}_digit` as keyof OTPInput)}
                                    className='p-2 border-2 w-[45px] text-center'
                                    type="text"
                                    maxLength={1}
                                    onChange={handleInput}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Backspace' && !e.currentTarget.value) {
                                            const prevInput = e.currentTarget.previousElementSibling as HTMLInputElement;
                                            if (prevInput) prevInput.focus();
                                        }
                                    }}
                                />
                            ))}
                        </div>
                        
                        <button type="button" onClick={handleResend} className='my-5 text-darkBg hover:text-red-500' disabled={loading}>
                            Resend code
                        </button>

                        <button type="submit" className='mt-5 px-10 py-2 bg-darkBg text-white disabled:opacity-50' disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify'}
                        </button>
                    </form>
                </div>
                <label className="modal-backdrop" htmlFor={EMAIL_VERIFICATION_MODAL_ID}>Close</label>
            </div>
        </div>
    );
});

EmailVerification.displayName = 'EmailVerification';

export default EmailVerification;