import '../index.css';

function LoginPage() {
    return(
        <main className='min-h-screen bg-black flex items-center justify-end'>
            <img src='/assets/croc.png' alt='croc - workout logo' className='w-200 min-w-200 h-200 min-h-200'/>
            <div className='rounded-xl p-6 text-white border border-white
                shadow-[0_0_35px] shadow-white bg-pink-50 flex flex-col items-center min-w-160 w-160 min-h-200 h-200 rounded-[18px] mr-80 ml-40'>
                <p className='text-black font-bold text-[64px] p-5'>Login</p>
                <p className='text-black text-[30px]' >Track your workouts. Stay Consistent</p>
                <button type='button' className='rounded-full p-7 border-[5px] border-transparent
                    [background:linear-gradient(#000,#000)_padding-box,linear-gradient(90deg,#f0f,#0ff,#0f0)_border-box] w-55 h-55 mt-20 transition-transform duration-300 ease-in-out hover:scale-105
                    active:scale-95 cursor-pointer ' onClick={()=> {console.log('you clicked me');}}>
                    <img src='assets/google.png' alt='google authenticator' className='block'/>
                </button>
                <p className='text-[40px] m-15 bg-white/70 backdrop-blur-xl pl-5 pr-5 pt-2 pb-2 rounded-3xl text-zinc-600'>Sign in with Google</p>
                <p className="mt-4 text-center text-xs text-zinc-500"> By continuing, you agree to our <a className="underline decoration-dotted" href="#">Terms</a> and <a className="underline decoration-dotted" href="#">Privacy Policy</a>. We never post to your account. </p>
            </div>
            
        </main>

    );
}

export default LoginPage