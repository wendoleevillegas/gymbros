import { useNavigate, useOutletContext } from 'react-router-dom'
import { useAuth } from '../contexts/theme/AuthContext.jsx';

function AuthGate(){
    const navigate = useNavigate();
    // const { setIsAuth } = useOutletContext();
    const { setIsAuth } = useAuth();

    return (
    <>
      <div className='absolute top-4 right-4 bg-white dark:bg-black text-white dark:text-white p-4'>
        <div className='mb-2 font-semibold text-black dark:text-white'> AuthGate</div>
        <button className="mr-2 mb-2 px-4 py-2 bg-gray-200 dark:bg-white rounded"
        onClick={() => {
        // set local storage and state
        localStorage.setItem("isAuth", "true");
        setIsAuth(true);
        navigate('/');
        //could add somewhere to redirect here if we wanted to
        }}>
            login
        </button>
        <button className="mb-2 px-4 py-2 bg-gray-200 dark:bg-white rounded"
        onClick={() => {
        // remove from local storage and state
        localStorage.setItem("isAuth", "false");
        setIsAuth(false);
        navigate('/login'); // go to login page after logging out
        }}>
            logout
        </button>
        {/* <button className="block mb-2 px-4 py-2 bg-blue-500 dark:bg-white rounded"
        onClick={() => navigate('/Protected')}>
        Go to Protected Page
        </button> */}
        <button className="block mb-2 px-4 py-2 bg-blue-500 dark:bg-white rounded"
        onClick={() => navigate('/profile')}>
        Go to Profile Page
        </button>
     </div>
    </>
  );
}

export default AuthGate