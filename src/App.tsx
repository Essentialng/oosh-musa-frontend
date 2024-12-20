// // // src/App.tsx
// // import React from "react";
// // import { BrowserRouter as Router } from "react-router-dom";
// // import AppRouter from "./route/AppRouter";
// // import { Provider } from "react-redux";
// // import store, { persistor } from "./redux/store";
// // import { ApolloProvider, useQuery } from "@apollo/client";
// // import client from "./graphql/client.apollo";
// // import { Toaster } from "react-hot-toast";
// // import './App.css';
// // import { AuthProvider } from "./context/AuthProvider";
// // import { PersistGate } from "redux-persist/integration/react";  // Correct
// // import { GET_ALL_POST } from "./graphql/query/post.query";
// // import { useDispatch } from "react-redux";
// // import { setPosts } from "./redux/slice/post.slice";


// // const App: React.FC = () => {
// //   const dispatch = useDispatch()
// //   // make api call to fetch all posts
// //   const { data, loading, error } = useQuery(GET_ALL_POST);
// //   dispatch(setPosts(data?.getAllPost))
// //   return (
// //     <ApolloProvider client={client}>
// //       <AuthProvider>
// //         <Provider store={store}>
// //           <PersistGate loading={null} persistor={persistor}>
// //             <Router>
// //               <Toaster position="top-center"/>
// //               <AppRouter />
// //             </Router>
// //           </PersistGate>
// //         </Provider>
// //       </AuthProvider>
// //     </ApolloProvider>
// //   );
// // };

// // export default App;


// // ---------------- version 2 --------------
// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import AppRouter from "./route/AppRouter";
// import { Provider } from "react-redux";
// import store, { persistor } from "./redux/store";
// import { ApolloProvider, useQuery } from "@apollo/client";
// import client from "./graphql/client.apollo";
// import { Toaster } from "react-hot-toast";
// import './App.css';
// import { AuthProvider } from "./context/AuthProvider";
// import { PersistGate } from "redux-persist/integration/react"; // Correct
// // import { GET_ALL_POST } from "./graphql/query/post.query";
// import { useDispatch } from "react-redux";
// import { setPosts } from "./redux/slice/post.slice";
// import LoaderSpinner from "./components/molecules/Loader/Loader.spinner";
// import { useMakeRequest } from "./hooks/useMakeRequest";
// import { POST_URL } from "./constant/resource";

// const FetchPosts: React.FC = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const makeRequest = useMakeRequest()
//   // const { data, loading, error } = useQuery(GET_ALL_POST);
  

//   // useEffect(() => {

//   //   if (data && !loading && !error) {
//   //     dispatch(setPosts(data.getAllPost));
//   //   }
//   // }, [data, loading, error, dispatch]);
//   useEffect(()=>{
//     const onSuccess = (data:any)=>{
//       console.log('data ---> ', data)
//       // dispatch(setPosts(data))
//     }
//     setLoading(true)
//     const fetchData = async()=>{
//       await makeRequest(
//         POST_URL + 'all',
//         'POST',
//         {},
//         onSuccess,
//         (error)=>{setError(error)},
//         ()=>{setLoading(false)}
//       )
//     }
//     fetchData()
//   }, [])

//   if (loading) return <LoaderSpinner color='purple'/>
//   if (error) return <div>Error fetching posts</div>;

//   return null;
// };

// const App: React.FC = () => {
//   const [loading, setLoading] = useState(false)
//   const dispatch = useDispatch()
//   const makeRequest = useMakeRequest()

//   return (
//     <ApolloProvider client={client}>
//       <AuthProvider>
//         <Provider store={store}>
//           <PersistGate loading={null} persistor={persistor}>
//             <Router>
//               <Toaster position="top-center" />
//               <AppRouter />
//               <FetchPosts />
//             </Router>
//           </PersistGate>
//         </Provider>
//       </AuthProvider>
//     </ApolloProvider>
//   );
// };

// export default App;


// ---------- version 2 ----------
// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import AppRouter from "./route/AppRouter";
// import { Provider, useDispatch } from "react-redux";
// import store, { persistor } from "./redux/store";
// import { Toaster } from "react-hot-toast";
// import './App.css';
// import { AuthProvider } from "./context/AuthProvider";
// import { PersistGate } from "redux-persist/integration/react";
// import { setPosts } from "./redux/slice/post.slice";
// import LoaderSpinner from "./components/molecules/Loader/Loader.spinner";
// import { POST_URL } from "./constant/resource";
// import axios from "axios";

// const FetchPosts: React.FC = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${POST_URL}all`);
//         console.log('Posts data:', response.data);
//         dispatch(setPosts(response.data));
//       } catch (err) {
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

// const App: React.FC = () => {
//   return (
//     <AuthProvider>
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <Router>
//             <Toaster position="top-center" />
//             <AppRouter />
//             <FetchPosts />
//           </Router>
//         </PersistGate>
//       </Provider>
//     </AuthProvider>
//   );
// };

// export default App;

// ---------- version 3 ---------------
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./route/AppRouter";
import { Provider, useDispatch } from "react-redux";
import store, { persistor } from "./redux/store";
import { Toaster } from "react-hot-toast";
import './App.css';
import { AuthProvider } from "./context/AuthProvider";
import { PersistGate } from "redux-persist/integration/react";
import { setPosts } from "./redux/slice/post.slice";
import LoaderSpinner from "./components/molecules/Loader/Loader.spinner";
import { POST_URL } from "./constant/resource";
import { useMakeRequest } from "./hooks/useMakeRequest";


const FetchPosts: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const makeRequest = useMakeRequest()


  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const onSuccess = (data:any)=>{
        // log to see how the structure looks
        const postsData = Array.isArray(data.data) 
          ? data.data 
          : data.data.posts || data.data.data || [];

        dispatch(setPosts(postsData));
      }
      try {
        await makeRequest(
            POST_URL + '/all',
            'GET',
            {},
            onSuccess,
            (error)=>{setError(error)},
            ()=>{setLoading(false)}
          )
        

      } catch (err) {
        console.error('Fetch posts error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [dispatch]);

  if (loading) return <LoaderSpinner color='purple' />;
  if (error) return <div>Error fetching posts: {error}</div>;

  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Toaster position="top-center" />
            <AppRouter />
            <FetchPosts />
          </Router>
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
};

export default App;