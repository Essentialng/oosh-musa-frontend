import React, { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextInterface {
    auth: Record<string, any>;
    setAuth: (auth: Record<string, any>) => void;
}

const AuthContext = createContext<AuthContextInterface>({
    auth: {},
    setAuth: () => {} // Provide a default no-op function
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<Record<string, any>>({});

    return (
        <AuthContext.Provider value={{ setAuth, auth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;