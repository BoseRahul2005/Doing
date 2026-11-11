import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/auth/RequireAuth";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CreateWorkspace from "./pages/CreateWorkspace.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/onboard"
          element={
            <RequireAuth>
              <OnboardingPage />
            </RequireAuth>
          }
        />
        <Route
          path="/create-workspace"
          element={
            <RequireAuth>
              <CreateWorkspace />
            </RequireAuth>
          }
        />
        <Route
          path="/w/:orgId/*"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
