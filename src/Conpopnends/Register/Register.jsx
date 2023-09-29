import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../firbase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [error, seterror] = useState('')
    const [user, setuser] = useState('')
    const [show, setShow] = useState(false)
    const hadndlesubmit = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const chekd = e.target.cheakbox.checked;
        console.log(name, email, password, chekd)
        seterror('')
        setuser('')
        if (password.length < 6) {
            seterror('Password should be at least 6 characters add more')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            seterror('Please add 1 or more carecter Upercase')
            return;
        }
        else if(!chekd){
            seterror('Pelase fill up our condition')
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user
                setuser('Register succesfully Enter your account')

                updateProfile(user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(() => console.log('udated profile'))
                .catch((error) => {
                    console.log(error)
                })
                sendEmailVerification(user)
                .then(() =>{
                    alert('Please chek your email and veryfi your account')
                })
                console.log(user)
            })
            .catch(error => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                seterror(errorMessage)
                console.log(error)
            })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={hadndlesubmit}>
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="email" name="name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" name="email" className="input input-bordered" required />
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
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" name="cheakbox" id="terms" />
                                    <label htmlFor="terms">Please Fill <a href="">Up our conditon</a></label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary"><input type="submit" value="Register" /></button>
                                </div>
                                {
                                    error && <p className=" text-red-500">{error}</p>
                                }
                                {
                                    user && <p className=" text-green-500">{user}</p>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;