import { Link } from "react-router-dom";
import { GiWeightLiftingUp } from "react-icons/gi";
import { IoPersonOutline } from "react-icons/io5";
import { HiHome } from "react-icons/hi";
import { GrHistory } from "react-icons/gr";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-t border-dark dark:border-white dark:bg-black text-black dark:text-white fixed bottom-0 left-0 w-full py-4 px-8 z-50">
      <ul className="list-none flex justify-between items-center w-[95%] p-0 m-0 mx-auto">
        <li className="Home">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-(--primary)" : ""}`
            }
          >
            <HiHome className="w-8 h-8 mb-1" />
            <span>Home</span>
          </NavLink>
        </li>
        <li className="Workout">
          <NavLink
            to="/workout"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-(--primary)" : ""}`
            }
          >
            <GiWeightLiftingUp className="w-8 h-8 mb-1" />
            <span>Workout</span>
          </NavLink>
        </li>
        <li className="Profile">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-(--primary)" : ""}`
            }
          >
            <IoPersonOutline className="w-8 h-8 mb-1" />
            <span>Profile</span>
          </NavLink>
        </li>
        {/*<li className="History">
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-(--primary)" : ""}`
            }
          >
            <GrHistory className="w-8 h-8 mb-1" />
            <span>History</span>
          </NavLink>
        </li>*/}
      </ul>
    </nav>
  );
}
