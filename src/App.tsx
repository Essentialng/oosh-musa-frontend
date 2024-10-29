import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./route/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client.apollo";
import { Toaster } from "react-hot-toast";
import './App.css'




const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
        <Toaster position="top-center"/>
          <AppRouter />
        </Router>
      </Provider>
    </ApolloProvider>
  );
};

export default App;