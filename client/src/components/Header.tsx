import {
  FaPlusSquare,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Movie List</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="add-new-movie">
                <FaPlusSquare />
                Add New Movie
              </Link>
            </li>
            <li>
              <Link to="favorite-movies">
                <MdFavorite />
                Favorite Movies
              </Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to="registration">
                <FaUserAlt />
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
