import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useTheme } from "../contexts/theme/theme-context";

const ModeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="fixed top-4 left-4 z-50 p-2 text-gray-600 border border-gray-300 rounded-md bg-slate-100 cursor-pointer"
      onClick={() => toggleTheme()}
    >
      {theme === "light" ? (
        <FaMoon className="size-4" />
      ) : (
        <CiSun className="size-4" />
      )}
    </button>
  );
};
export default ModeToggle;
