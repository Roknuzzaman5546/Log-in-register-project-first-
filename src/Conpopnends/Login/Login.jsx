import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import auth from '../firbase/firebase.config';

const Login = () => {
    const [show, setShow] = useState(false)
    const [user, setuser] = useState('')
    const [error, seterror] = useState('')
    const emailref = useRef(null);


    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        seterror('')
        setuser('')

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                if (user.emailVerified) {
                    setuser("YOUR ACCOUNT IS LOGGED IN PLEASE ENRER THIS")
                }
                else {
                    alert('Please veryfied your email')
                }
            })
            .catch(error => {
                const errore = error.message;
                seterror(errore);
            })
    }

    const handleresetpassword = () => {
        const email = emailref.current.value;
        if (!email) {
            console.log('Please provide your email', emailref.current.value)
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log('Pleas write a valid email')
            return;
        }
        // alert('PLease chek your email')
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('please chek your email')
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        ref={emailref}
                                        placeholder="email"
                                        className="input input-bordered"
                                        required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className=" relative">
                                        <input
                                            type={show ? 'text' : 'password'}
                                            placeholder="password"
                                            name="password"
                                            className="input input-bordered w-full" required />
                                        <span onClick={() => setShow(!show)} className=" absolute top-4 right-3">
                                            {
                                                show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                            }</span>
                                    </div>
                                    <label className="label" onClick={handleresetpassword} required>
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                                {
                                    error && <p className=' text-red-500'>{error}</p>
                                }
                                {
                                    user && <p className=' text-green-500'>{user}</p>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;