import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Loading from "../utils/Loading";
import { useDispatch } from "react-redux";
import { checkToken } from "../redux/Reducers/isAuthSlice";
const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));
const SignIn = lazy(() => import("../pages/SignIn"));
const Blog = lazy(() => import("../pages/Blog"));
const Profile = lazy(() => import("../pages/Profile"));
const OwnBlog = lazy(() => import("../pages/OwnBlog"));

const RouteSuspense = ({ children }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);

function Allroutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <RouteSuspense>
              <SignIn />
            </RouteSuspense>
          }
        />
        <Route
          path="/signUp"
          element={
            <RouteSuspense>
              <Login />
            </RouteSuspense>
          }
        />

        <Route
          path="/addblog"
          element={
            <PrivateRoutes>
              <RouteSuspense>
                <Blog />
              </RouteSuspense>
            </PrivateRoutes>
          }
        />
        <Route
          path="/addblog/:ID"
          element={
            <PrivateRoutes>
              <RouteSuspense>
                <Blog />
              </RouteSuspense>
            </PrivateRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <RouteSuspense>
                <Profile />
              </RouteSuspense>
            </PrivateRoutes>
          }
        />
        <Route
          path="/ownblog"
          element={
            <PrivateRoutes>
              <RouteSuspense>
                <OwnBlog />
              </RouteSuspense>
            </PrivateRoutes>
          }
        />
        <Route
          path="/"
          element={
            <RouteSuspense>
              <Home />
            </RouteSuspense>
          }
        />
      </Routes>
    </>
  );
}

export default Allroutes;
