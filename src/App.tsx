import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./route/AppRouter";
import { Provider, useDispatch } from "react-redux";
import store, { persistor } from "./redux/store";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import { PersistGate } from "redux-persist/integration/react";
import { setPosts } from "./redux/slice/post.slice";
import LoaderSpinner from "./components/molecules/Loader/Loader.spinner";
import { POST_URL } from "./constant/resource";
import { useMakeRequest } from "./hooks/useMakeRequest";
import { SocketProvider } from "./context/socket.context";

// const FetchPosts: React.FC = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const makeRequest = useMakeRequest()

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);
//       const onSuccess = (data:any)=>{
//         // log to see how the structure looks
//         const postsData = Array.isArray(data.data)
//           ? data.data
//           : data.data.posts || data.data.data || [];

//         dispatch(setPosts(postsData));
//       }
//       try {
//         await makeRequest(
//             POST_URL + '/all',
//             'GET',
//             {},
//             onSuccess,
//             (error)=>{setError(error)},
//             ()=>{setLoading(false)}
//           )

//       } catch (err) {
//         console.error('Fetch posts error:', err);
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [dispatch]);

//   if (loading) return <LoaderSpinner color='purple' />;
//   if (error) return <div>Error fetching posts: {error}</div>;

//   return null;
// };

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SocketProvider>
            <Router>
              <Toaster position="top-center" />
              <AppRouter />
              {/* <FetchPosts /> */}
            </Router>
          </SocketProvider>
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
};

export default App;
