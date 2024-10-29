import AuthLayout from "../components/templates/auth/AuthTemplate";
import ChatTemplate from "../components/templates/chat/ChatTemplate";
import FeedTemplate from "../components/templates/feed/FeedTemplate";
import PlanTemplate from "../components/templates/plan/PlanTemplate";
import Homepage from "../pages/Homepage";
import Live from "../pages/Live";
import Login from "../pages/Login";
import Meeting from "../pages/Meeting";
import Messenger from "../pages/Messenger";
import News from "../pages/News";
import Plan from "../pages/Plan";
import Profile from "../pages/Profile";
import Reel from "../pages/Reel";
import Register from "../pages/Register";
import Timeline from "../pages/Timeline";
import UserProfile from "../pages/UserProfile";

type RouteType = {
    path: string;
    name: string;
    element: React.ReactNode;
    layout: React.ComponentType<{ children: React.ReactNode }>;
    protected: boolean;
  };


  const routes:RouteType[] = [
    {
        path: '/',
        name: 'Home',
        element: <Homepage />,
        layout: FeedTemplate,
        protected: false
    },
    {
      path: '/reel',
      name: 'Reel',
      element: <Reel/>,
      layout: FeedTemplate,
      protected: true,
    },
    {
      path: '/timeline',
      name: 'Timeline',
      element: <Timeline/>,
      layout: FeedTemplate,
      protected: true,
    },
    {
      path: '/meet',
      name: 'Meet',
      element: <Meeting/>,
      layout: FeedTemplate,
      protected: true,
    },
    {
      path: '/plan',
      name: 'Plan',
      element: <Plan/>,
      layout: PlanTemplate,
      protected: true,
    },
    {
      path: '/news',
      name: 'News',
      element: <News/>,
      layout: FeedTemplate,
      protected: true,
    },
    {
      path: '/live',
      name: 'Live',
      element: <Live/>,
      layout: FeedTemplate,
      protected: true,
    },
    {
      path: '/login',
      name: 'Login',
      element: <Login />,
      layout: AuthLayout,
      protected: false,
    },
    {
      path: '/register',
      name: 'Register',
      element: <Register />,
      layout: AuthLayout,
      protected: false,
    },
    {
      path: '/user/:userId',
      name: 'User Profile',
      element: <UserProfile/>,
      layout: FeedTemplate,
      protected: true,
    },
    {
      path: '/profile/:userId',
      name: 'User Profile',
      element: <Profile/>,
      layout: FeedTemplate,
      protected: true,
    },
    {
      path: '/chat/:userId',
      name: 'Chat',
      element: <Messenger />,
      layout: ChatTemplate,
      protected: true,
    }
  ]


  export default routes