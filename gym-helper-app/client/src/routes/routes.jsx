// import { createBrowserRouter } from "react-router-dom";
// import App from "../App.jsx";
// import Home from "../pages/Home/Home.jsx";
// import History from "../pages/History/History.jsx";
// import Profile from "../pages/Profile/Profile.jsx";
// import Workout from "../pages/Workout/Workout.jsx";
// import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
// import AuthGate from "../components/AuthGate.jsx";
// import LoginPage from "../pages/LoginPage.jsx";

// export const router = createBrowserRouter([
//   {
//     // routes inside here are private
//     path: "/", 
//     element: (
//       <ProtectedRoute>
//         <App />
//       </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <Home /> },
//       { path: "history", element: <History /> },
//       { path: "profile", element: <Profile /> },
//       { path: "workout", element: <Workout /> },
//       { path: "auth", element: <AuthGate /> },
//     ],
//   },
//     // routes inside here are public
//   {
//       path: "/login",
//       element: <LoginPage />,
//     },
//   // { 
//   //   path: "protected", 
//   //   element: (
//   //     <ProtectedRoute>
//   //       <div className="bg-white dark:bg-black text-black dark:text-white">
//   //         Protected Content goes here
//   //       </div>
//   //     </ProtectedRoute>
//   //   ),
//   // },
//   // {
//   //   path: "auth",  //type in /auth at the top of the browser if you wanna look
//   //   element: <AuthGate/>
//   // },
// ]);
