export interface ITextInput {
    name: string;
    value?: string;
    placeholder: string;
    onChange?: ()=>void;
    title?:string;
    icon?: any;
    rounded?: string;
    fullWidth?: boolean;
    required?: boolean;
    register?: any; 
    errors?: any;
}


export interface KeyValueObj {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

export interface IStep {
    id: string;
    step: string | null;
  }