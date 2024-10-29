import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {routes.map((route) => {
        const Layout = route.layout;
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Layout>
                {route.protected ? (
                  <ProtectedRoute>{route.element}</ProtectedRoute>
                ) : (
                  route.element
                )}
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
};

// This is a placeholder for the ProtectedRoute component
// You'll need to implement this based on your authentication logic
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Add your authentication check here
  const isAuthenticated = true; // Replace with actual auth check
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default AppRouter;