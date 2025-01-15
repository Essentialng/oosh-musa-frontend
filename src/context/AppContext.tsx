import { KeyValueObj } from "../type/other.types"; 
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

// Define the types for user information and context
interface IUserInfo {
  phone?: number;
  email?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  company?: any;
  role?: any;
  wallet_data?: any;
  wallet_request_data?: any;
}

export interface IAppContext {
  userInfo: IUserInfo;
  isLoggedIn: boolean;
  setUserInfo: (info: IUserInfo) => void;
  setLoginStatus: (status: boolean) => void;
  role: KeyValueObj;
  setRole: Dispatch<SetStateAction<KeyValueObj>>;
  selectedField: string;
  setSelectedField: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<IAppContext | null>(null);

interface IAppProviderProps {
  children: ReactNode;
}

// AppProvider component
export function AppProvider({ children }: IAppProviderProps) {
  // State management for user information and login status
  const [userInfo, setUserInfo] = useState<IUserInfo>({ phone: 0, email: "" });
  const [isLoggedIn, setLoginStatus] = useState<boolean>(false);
  const [role, setRole] = useState({});
  const [selectedField, setSelectedField] = useState("");

  return (
    <AppContext.Provider
      value={{
        userInfo,
        isLoggedIn,
        setUserInfo,
        setLoginStatus,
        role,
        setRole,
        selectedField,
        setSelectedField,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
