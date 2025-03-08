import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleDarkMode } from "../store/slices/uiSlice";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";

const Navbar = ({ darkMode }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to={"/"} className="flex">
            <img src={logo} alt="Logo" className="h-10 w-10" />
          </Link>

          <div className="flex items-center space-x-4">
            {/* Avatar Dropdown */}
            <div className="relative group">
              <img
                src={avatar}
                alt="Avatar"
                className="h-10 w-10 rounded-full cursor-pointer"
              />
              <div className="absolute right-0 hidden group-hover:block bg-white dark:bg-gray-700 rounded-md shadow-lg">
                <Link
                  to={"/favorites"}
                  className="block px-4 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Favorites
                </Link>
                <Link
                  to={"/profile"}
                  className="block px-4 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Profile
                </Link>
              </div>
            </div>
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-500" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gary-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
