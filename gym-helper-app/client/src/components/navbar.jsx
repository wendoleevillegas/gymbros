import { GiWeightLiftingUp } from "react-icons/gi";
import { IoPersonOutline } from "react-icons/io5";
import { HiHome } from "react-icons/hi";
import { GrHistory } from "react-icons/gr";

const Navbar = () => {
    return (
        <nav className="bg-white dark:bg-black text-black dark:text-white fixed bottom-0 left-0 w-full py-4 px-8 z-50">
            <ul className = "list-none flex justify-between items-center w-[95%] p-0 m-0">
                <li className = "Workout">
                    <div className = "flex flex-col items-center">
                        <GiWeightLiftingUp className="w-8 h-8 mb-1" />
                        <span>workout</span>
                    </div>
                </li>
                <li className = "Profile">
                    <div className = "flex flex-col items-center">
                        <IoPersonOutline className="w-8 h-8 mb-1"/>
                        <span>Profile</span>
                    </div>
                </li>
                <li className = "Home">
                    <div className = "flex flex-col items-center">
                        <HiHome className="w-8 h-8 mb-1" />
                        <span>Home</span>
                    </div>
                </li>
                <li className = "History">
                    <div className = "flex flex-col items-center">
                        <GrHistory className="w-8 h-8 mb-1"/>
                        <span>History</span>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;