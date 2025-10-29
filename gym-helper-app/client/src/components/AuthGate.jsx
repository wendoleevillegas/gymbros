import { useNavigate } from 'react-router-dom'

function AuthGate({ setIsAuth }){
    const navigate = useNavigate();
    return (
    <>
      <div className='absolute top-4 right-4 bg-white dark:bg-black text-white dark:text-white p-4'>
        <div className='mb-2 font-semibold text-black dark:text-white'>AuthGate</div>
        <button className="mr-2 mb-2 px-4 py-2 bg-gray-200 dark:bg-white rounded"
        onClick={() => {
        setIsAuth(true);
        //could add somewhere to redirect here if we wanted to
        }}>
            login
        </button>
        <button className="mb-2 px-4 py-2 bg-gray-200 dark:bg-white rounded"
        onClick={() => {
        setIsAuth(false);
        }}>
            logout
        </button>
        <button className="block mb-2 px-4 py-2 bg-blue-500 dark:bg-white rounded"
        onClick={() => navigate('/Protected')}>
        Go to Protected Page
        </button>
     </div>
    </>
  );
}

export default AuthGate