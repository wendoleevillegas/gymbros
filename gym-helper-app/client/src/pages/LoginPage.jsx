import '../index.css';
import { useAuth } from '../contexts/theme/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="h-screen bg-white landscape:bg-black flex items-center justify-center p-4 w-full">
      <div
        className="
          w-full min-h-dvh rounded-none p-6 bg-white text-black flex flex-col items-center

     
          landscape:w-[95vw] landscape:max-w-[680px] landscape:min-w-[380px] landscape:min-h-[80vh]
          landscape:rounded-[18px] landscape:p-10
          landscape:shadow-[0_0_35px] landscape:shadow-white/20
          landscape:border landscape:border-white/10 relative
        "
      >
        <div className="flex items-end justify-center w-full absolute top-[0%] h-1/5">
          <p className="font-bold text-[40px] lg:text-[64px] lg">Login</p>
        </div>
        <div className="grid place-items-center w-full absolute top-[20%] h-1/15">
          <p className="text-[18px] lg:text-[30px] text-zinc-700 text-center">
            Track your workouts. Stay Consistent
          </p>
        </div>
        <div className="grid place-items-center w-full top-[30%] absolute h-4/9">
          <img
            src="/assets/croc-dark.png"
            alt="croc logo"
            className="h-70 w-70 lg:h-100 lg:w-100"
          />
        </div>
        <div className="absolute inset-x-0 top-[75%] grid place-items-center w-full">
          <button
            type="button"
            aria-label="Sign in with Google"
            onClick={login}
            className="
      inline-flex items-center justify-center gap-4 rounded-3xl
      px-5 lg:px-7 h-16 lg:h-20
      bg-white text-zinc-700
      border-[5px] border-transparent
      [box-shadow:0_0_12px_6px_rgba(0,0,0,.22)]
      hover:[box-shadow:0_0_20px_8px_rgba(0,0,0,.26)]
      active:[box-shadow:0_0_16px_5px_rgba(0,0,0,.20)]
      transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95
    "
          >
            <img
              src="/assets/google.png"
              alt=""
              aria-hidden="true"
              className="h-5 w-5 lg:h-6 lg:w-6 flex-shrink-0"
            />
            <span className="text-base lg:text-2xl text-white text-zinc-300 leading-none whitespace-nowrap font-medium">
              Sign in with Google
            </span>
          </button>
        </div>
        <div className="grid place-items-center w-full top-[85%] absolute h-1/9">
          <p className="mt-[4rem] text-center text-xs text-zinc-500 px-4">
            By continuing, you agree to our{" "}
            <a className="underline decoration-dotted" href="#">Terms</a> and{" "}
            <a className="underline decoration-dotted" href="#">Privacy Policy</a>. We never post to your account.
          </p>
        </div>
      </div>
    </main>
  );

}

// function LoginPage({homePage}) {
//   return (
//     <main className="h-screen bg-white landscape:bg-black flex items-center justify-center p-4">
//       <div
//         className="
//           w-full min-h-dvh rounded-none p-6 bg-white text-black flex flex-col items-center


//           landscape:w-[95vw] landscape:max-w-[680px] landscape:min-w-[380px] landscape:min-h-[80vh]
//           landscape:rounded-[18px] landscape:p-10
//           landscape:shadow-[0_0_35px] landscape:shadow-white/20
//           landscape:border landscape:border-white/10 relative
//         "
//       >
//         <div className="flex items-end justify-center w-full absolute top-[0%] h-1/5">
//           <p className="font-bold text-[40px] lg:text-[64px] lg">Login</p>
//         </div>
//         <div className="grid place-items-center w-full absolute top-[20%] h-1/15">  
//           <p className="text-[18px] lg:text-[30px] text-zinc-700 text-center">
//           Track your workouts. Stay Consistent
//           </p>
//         </div>
//         <div className="grid place-items-center w-full top-[30%] absolute h-4/9">
//           <img 
//               src="/assets/croc-dark.png"
//               alt="croc logo"
//               className="h-70 w-70 lg:h-100 lg:w-100"
//           />
//         </div>
//         <div className="absolute inset-x-0 top-[75%] grid place-items-center w-full">
//   <button
//     type="button"
//     aria-label="Sign in with Google"
//     onClick={homePage}
//     className="
//       inline-flex items-center justify-center gap-4 rounded-3xl
//       px-5 lg:px-7 h-16 lg:h-20
//       bg-white text-zinc-700
//       border-[5px] border-transparent
//       [box-shadow:0_0_12px_6px_rgba(0,0,0,.22)]
//       hover:[box-shadow:0_0_20px_8px_rgba(0,0,0,.26)]
//       active:[box-shadow:0_0_16px_5px_rgba(0,0,0,.20)]
//       transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95
//     "
//   >
//     <img
//       src="/assets/google.png"
//       alt=""
//       aria-hidden="true"
//       className="h-5 w-5 lg:h-6 lg:w-6 flex-shrink-0"
//     />
//     <span className="text-base lg:text-2xl text-white text-zinc-300 leading-none whitespace-nowrap font-medium">
//       Sign in with Google
//     </span>
//   </button>
// </div>
//         <div className="grid place-items-center w-full top-[85%] absolute h-1/9">
//           <p className="mt-[4rem] text-center text-xs text-zinc-500 px-4">
//             By continuing, you agree to our{" "}
//             <a className="underline decoration-dotted" href="#">Terms</a> and{" "}
//             <a className="underline decoration-dotted" href="#">Privacy Policy</a>. We never post to your account.
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }

export default LoginPage
