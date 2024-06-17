// import { Button } from "antd";
import "./stylesheets/text-elements.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/alignments.css";
import "./stylesheets/theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/index.js";
import Register from "./pages/Register/index.js";
import Home from "./pages/Home/index.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import PublicRoute from "./components/PublicRoute.js";
import Loader from "./components/Loader.js";
import { useSelector } from "react-redux";
function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
