import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import History from "./pages/History/History.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Workout from "./pages/Workout/Workout.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "history", element: <History /> },
      { path: "profile", element: <Profile /> },
      { path: "workout", element: <Workout /> },
    ],
  },
]);
