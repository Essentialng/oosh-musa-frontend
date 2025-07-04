import RegisterPost from "../components/organisms/market/RegisterPost";
import AuthLayout from "../components/templates/auth/AuthTemplate";
import ChatTemplate from "../components/templates/chat/ChatTemplate";
import CoverTemplate from "../components/templates/cover/CoverTemplate";
import FeedTemplate from "../components/templates/feed/FeedTemplate";
import LiveTemplate from "../components/templates/live/LiveTemplate";
import PlanTemplate from "../components/templates/plan/PlanTemplate";
import NotFound from "../pages/404/NotFound";
import EarningHome from "../pages/earnings";
import Earning from "../pages/earnings/Earning";
import ViewProduct from "../pages/earnings/view-product";
import Homepage from "../pages/Homepage";
import Live from "../pages/Live";
import LiveStrem from "../pages/LiveEvent";
import Login from "../pages/Login";
import Meeting from "../pages/Meeting";
import Messenger from "../pages/Messenger";
import Messenger2 from "../pages/Messenger2";
import News from "../pages/news/News";
import Notification from "../pages/notification/Notification";
import Plan from "../pages/Plan";
import Profile from "../pages/Profile";
import Reel from "../pages/Reel";
import Register from "../pages/Register";
import SinglePost from "../pages/SinglePost";
import Timeline from "../pages/Timeline";
import UpdatePage from "../pages/UpdatePage";
import UserProfile from "../pages/UserProfile";

type RouteType = {
  path: string;
  name: string;
  element: React.ReactNode;
  layout: React.ComponentType<{ children: React.ReactNode }>;
  protected: boolean;
};

const routes: RouteType[] = [
  {
    path: "/",
    name: "Home",
    element: <Homepage />,
    layout: FeedTemplate,
    protected: false,
  },
  {
    path: "/reel",
    name: "Reel",
    element: <Reel />,
    layout: FeedTemplate,
    protected: true,
  },
  {
    path: "/timeline",
    name: "Timeline",
    element: <Timeline />,
    layout: FeedTemplate,
    protected: true,
  },
  {
    path: "/meet",
    name: "Meet",
    element: <Meeting />,
    layout: FeedTemplate,
    protected: true,
  },
  {
    path: "/news",
    name: "News",
    element: <News />,
    layout: FeedTemplate,
    protected: true,
  },
  {
    path: "/live",
    name: "Live",
    element: <Live />,
    layout: FeedTemplate,
    protected: true,
  },
  {
    path: "/notification/:userId",
    name: "Notification",
    element: <Notification />,
    layout: FeedTemplate,
    protected: true,
  },
  {
    path: "/user/:userId",
    name: "User Profile",
    element: <UserProfile />,
    layout: FeedTemplate,
    protected: true,
  },
  {
    path: "/profile/:userId",
    name: "User Profile",
    element: <Profile />,
    layout: FeedTemplate,
    protected: true,
  },
  {
    path: "/update/:userId",
    name: "Update Profile",
    element: <UpdatePage />,
    layout: FeedTemplate,
    protected: true,
  },
  {
    path: "/post/:postId",
    name: "Single Post",
    element: <SinglePost />,
    layout: FeedTemplate,
    protected: true,
  },

  // ------- plans and plan templates -------
  {
    path: "/plan",
    name: "Plan",
    element: <Plan />,
    layout: PlanTemplate,
    protected: true,
  },

  // ------- Earn from post -------
  {
    path: "/earn",
    name: "Earn",
    element: <EarningHome />,
    layout: FeedTemplate,
    protected: true,
  },
  {
    path: "/register-post/:postId",
    name: "RegisterPost",
    element: <RegisterPost />,
    layout: FeedTemplate,
    protected: true,
  },

  {
    path: "/single-earn/:postId",
    name: "Earn",
    element: <ViewProduct />,
    layout: FeedTemplate,
    protected: true,
  },

  // ------- Auth and auth templates -------
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    layout: AuthLayout,
    protected: false,
  },
  {
    path: "/register",
    name: "Register",
    element: <Register />,
    layout: AuthLayout,
    protected: false,
  },

  // ---------- Live event template --------------
  {
    path: "/live/:eventId/:owner",
    name: "LiveStream",
    element: <LiveStrem />,
    layout: LiveTemplate,
    protected: false,
  },

  // ---------- chat and chat template --------------
  {
    path: "/chat/:userId",
    name: "Chat",
    element: <Messenger />,
    layout: ChatTemplate,
    protected: true,
  },

  // ---------- Other template --------------
  {
    path: "*",
    name: "404",
    element: <NotFound />,
    layout: CoverTemplate,
    protected: false,
  },
];

export default routes;
