import React from 'react';
import { Navigate , useOutletContext} from 'react-router-dom';

function ProtectedRoute({ children}) {
    //isAuth is the state determing whether we are authenticated or not
    const {isAuth} = useOutletContext();
    console.log("ProtectedRoute: isAuth =", isAuth);
    /*The ProtectedRoute component will use the useContext hook to get the user from your AuthContext
    If user exists, render requested component (pass as children)
    If user is null, use component from react-router-dom to redirect user to login*/
    return isAuth ? children : <Navigate to='/' replace/>

            
}

export default ProtectedRoute;
