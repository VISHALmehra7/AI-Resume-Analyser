import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { authStore } from "./zustand/authStore";
import { Route, Routes, Navigate } from "react-router-dom";
import Analytics from "./pages/Analytics";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated, user } = authStore();
  if (!isAuthenticated) return <Navigate to={"/login"} replace />;
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = authStore();
  if (isAuthenticated && user) return <Navigate to={"/"} replace />;
  return children;
};

function App() {
  const checkAuth = authStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen w-screen ">
      <Routes>
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path={"/login"}
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path={"/"}
          element={
            <ProtectRoute>
              <Home />
              {/* <Analytics/> */}
            </ProtectRoute>
          }
        />
        <Route
          path={"/analytics"}
          element={
            <ProtectRoute>
              <Analytics />
            </ProtectRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
