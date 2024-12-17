export interface IStepOne {
    step: string | '';
    username: string | '';
    phoneNumber: string | ''; 
    country: string | '';
    state: string | '';
    bio: string | '';
    profession: string | '';
    dateOfBirth: string | '';
    placeOfBirth: string | '';
    gender: string | '';
    id?: string;
    admin_email?: string;
  }


export interface IStepTwo {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string; 
    endDate: string; 
    id?: string;
    admin_email?: string;
  }


export interface IStepThree{
    company: string;
    occupation_position: string;
    occupation_startDate: Date | '';
    occupation_endDate: Date | '';
    id?: string;
    admin_email?: string;
  }


export type IStepFour = {
    avatar?: File;
    profile?: File;
    userId?: string;
    admin_email?: string;
  }