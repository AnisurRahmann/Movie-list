import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import AddNewMovie from "./pages/AddNewMovie";
import Dashboard from "./pages/Dashboard";
import FavoriteMovies from "./pages/FavoriteMovies";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import Registration from "./pages/Registration";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />

          {/* private routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="favorite-movies" element={<FavoriteMovies />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="add-new-movie" element={<AddNewMovie />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
